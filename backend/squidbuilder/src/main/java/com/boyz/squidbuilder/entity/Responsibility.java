package com.boyz.squidbuilder.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Responsibility {
    private int key;
    private String username;
    private String responsibility;
    private int complexity;
}
