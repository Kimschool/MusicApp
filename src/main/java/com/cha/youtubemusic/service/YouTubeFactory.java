package com.cha.youtubemusic.service;

import com.google.api.services.youtube.YouTube;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.json.JsonFactory;

public class YouTubeFactory {

    public static YouTube createYouTubeInstance(HttpTransport httpTransport, JsonFactory jsonFactory, String applicationName) {
        // YouTube API 키 등의 인증 정보를 설정
        String apiKey = "AIzaSyBGiZzA7476f7x48yp25UYKYn_IoxC6XjU"; // 여기에 자신의 유튜브 API 키를 넣어주세요

        // YouTube.Builder를 사용하여 YouTube 인스턴스 생성
        return new YouTube.Builder(httpTransport, jsonFactory, null)
                .setApplicationName(applicationName)
                .build();
    }
}

