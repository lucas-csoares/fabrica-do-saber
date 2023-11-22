package com.ti.fabricadosaber.services;


import java.util.List;
import java.util.Set;
import com.ti.fabricadosaber.exceptions.EntityNotFoundException;
import com.ti.fabricadosaber.models.*;
import com.ti.fabricadosaber.services.exceptions.DataBindingViolationException;
import com.ti.fabricadosaber.services.interfaces.TeamOperations;
import com.ti.fabricadosaber.utils.SecurityUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import com.ti.fabricadosaber.repositories.TeamRepository;
import jakarta.transaction.Transactional;

@Service
public class TeamService implements TeamOperations {

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private TeacherService teacherService;

    @Autowired
    @Lazy
    private StudentService studentService;

    @Autowired
    @Lazy
    private StudentTeamAssociationService studentTeamAssociationService;


    @Override
    public Team findById(Long id) {
        Team team = this.teamRepository.findById(id).orElseThrow(() -> new EntityNotFoundException(
                "Turma não encontrada! Id: " + id + ", Tipo: " + Team.class.getName()));

        SecurityUtil.checkUser();
        return team;
    }

    public List<Team> listAllTeams() {
        SecurityUtil.checkUser();

        List<Team> team = this.teamRepository.findAll();
        if (team.isEmpty()) {
            throw new EntityNotFoundException("Nenhuma turma cadastrada");
        }
        return team;
    }

    public List<Team> findAll() {
        return teamRepository.findAll();
    }



    /*    public List<Student> listStudents(Long id) {
        SecurityUtil.checkUser();

        Team team = teamRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Turma com o id " + id + " não encontrada."));

        return team.getStudents();
    }*/



    @Transactional
    public Team create(Team obj) {
        obj.setId(null);
        obj.setTeacher(checkTeacher(obj.getTeacher()));

        obj = this.teamRepository.save(obj);

        teamStudentsInCreate(obj);

        return obj;
    }

    @Override
    public Teacher checkTeacher(Teacher teacher) {
        Teacher existingTeacher = null;

        if(teacher != null)
            existingTeacher = teacherService.findById(teacher.getId());

        return existingTeacher;
    }


    private void teamStudentsInCreate(Team obj) {

        Set<Long> studentIds = obj.getStudentIds();

        if(studentIds != null && !studentIds.isEmpty()) {

            for(Long studentId : studentIds) {
                Student existingStudent = studentService.findById(studentId);

                studentTeamAssociationService.enrollStudentOnTeam(new StudentTeamAssociation(existingStudent, obj),
                        false);
            }
        }
    }




    @Transactional
    public Team update(Team obj) {
        Team newObj = findById(obj.getId());
        newObj.setName(obj.getName());
        newObj.setClassroom(obj.getClassroom());
        newObj.setGrade(obj.getGrade());
        newObj.setTeacher(checkTeacher(obj.getTeacher()));


        newObj.setNumberStudents(obj.getNumberStudents());


        newObj = this.teamRepository.save(newObj);

        updateTeamWithStudents(newObj);


        return newObj;
    }


    private void updateTeamWithStudents(Team team) {
        studentTeamAssociationService.updateTeamOnAssociation(team.getStudentIds(), team);
    }


    @Override
    public void delete(Long id) {
        Team team = findById(id);
        try {
            this.teamRepository.delete(team);
        } catch (Exception e) {
            throw new DataBindingViolationException("Não é possível excluir pois há entidades relacionadas");
        }
    }



    public void updateTeamStudentCount(Team team, Integer studentCount) {
        team.setNumberStudents(studentCount);
        teamRepository.save(team);
    }




   /* public TeamResponseDTO convertToTeamResponseDTO(Team team) {

        TeamResponseDTO dto = new TeamResponseDTO();
        dto.setId(team.getId());
        dto.setName(team.getName());
        dto.setClassroom(team.getClassroom());
        dto.setGrade(team.getGrade());
        dto.setNumberStudents(team.getNumberStudents());
        dto.setTeacherId(team.getTeacher().getId());

        if (team.getStudents() != null) {
            List<Long> studentIds = team.getStudents().stream()
                    .map(Student::getId)
                    .collect(Collectors.toList());
            dto.setStudentIds(studentIds);
        }

        return dto;
    }*/

}
