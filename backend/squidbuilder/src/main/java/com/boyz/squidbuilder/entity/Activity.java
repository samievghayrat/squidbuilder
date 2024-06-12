package com.boyz.squidbuilder.entity;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class Activity {
    private int key;
    private String name;
    private long date;
    private List<Responsibility> responsibilities;
}
