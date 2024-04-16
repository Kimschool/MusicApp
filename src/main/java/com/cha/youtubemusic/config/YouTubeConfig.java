package com.cha.youtubemusic.config;

import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.youtube.YouTube;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class YouTubeConfig {

    @Bean
    public YouTube youTube() {
        // HttpTransport 및 JsonFactory 객체 생성
        HttpTransport httpTransport = new NetHttpTransport();
        JsonFactory jsonFactory = new JacksonFactory();
        String applicationName = "your-application-name";

        // YouTubeFactory를 사용하여 YouTube 인스턴스 생성 및 반환
        return YouTubeFactory.createYouTubeInstance(httpTransport, jsonFactory, applicationName);
    }
}
