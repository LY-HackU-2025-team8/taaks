package com.team8.taaks;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class TaakApplication {

  public static void main(String[] args) {
    SpringApplication.run(TaakApplication.class, args);
  }
}
