package com.company.employeemanagement.service;


import com.company.employeemanagement.model.Users;
import com.company.employeemanagement.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public Users userProfile(String userId) throws Exception {
        return userRepository.findById(userId)
                .orElseThrow(() -> new Exception("User not found"));
    }

    public void updateExistingUser(Users user, String userId) throws Exception {
        Users existingUser = userRepository.findById(userId)
                .orElseThrow(() -> new Exception("User not found"));

        existingUser.setName(user.getName());
        existingUser.setRole(user.getRole());

        userRepository.save(existingUser);

    }

    public List<Users> allUsers() throws Exception {
        List<Users> usersList = userRepository.findAll();
        if (usersList.isEmpty()){
            throw new Exception("Users not found");
        }

        return usersList;
    }

    public void removeUser(String userId){
        userRepository.deleteById(userId);
    }



}
