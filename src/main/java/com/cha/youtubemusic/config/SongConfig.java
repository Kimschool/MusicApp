package com.cha.youtubemusic.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SongConfig {

    @Bean
    public String songInfo() {
        // 여기에 곡 정보를 넣어주세요
        return "your_song_info";
    }
}
