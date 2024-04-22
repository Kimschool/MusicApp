package com.cha.youtubemusic.service;

import com.cha.youtubemusic.auth.YouTubeAuth;
import com.google.api.client.auth.oauth2.Credential;
import com.google.api.services.youtube.YouTube;
import com.google.api.services.youtube.model.*;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;
@Service
public class MusicServiceImpl implements MusicService {

    private final YouTube youtube;

    @Autowired
    public MusicServiceImpl(YouTube youtube) {
        try {
            // YouTube API 인증
            Credential credential = YouTubeAuth.authorize();

            // YouTube 객체 초기화
            this.youtube = new YouTube.Builder(YouTubeAuth.HTTP_TRANSPORT, YouTubeAuth.JSON_FACTORY, credential)
                    .setApplicationName(YouTubeAuth.APPLICATION_NAME)
                    .build();
        } catch (GeneralSecurityException | IOException e) {
            throw new RuntimeException("Error initializing YouTube API", e);
        }
    }

    @Override
    public boolean addToPlaylist(String selectedSong) {
        String playlistId = "PLyBo_4T8mx6CPlvgJDzG08-he10knjGcy";
        try {
            // Gson 객체 생성
            Gson gson = new Gson();

            // selectedSong을 JSON으로 파싱하여 Java 객체로 변환
            JsonObject jsonObject = gson.fromJson(selectedSong, JsonObject.class);

            // videoId 추출
            String videoId = jsonObject.getAsJsonObject("song").getAsJsonObject("id").get("videoId").getAsString();


            // 플레이리스트 아이템 생성을 위한 스니펫 설정
            PlaylistItemSnippet snippet = new PlaylistItemSnippet();
            snippet.setPlaylistId(playlistId);
            ResourceId resourceId = new ResourceId();
            resourceId.setKind("youtube#video");
            resourceId.setVideoId(videoId);
            snippet.setResourceId(resourceId);

            // 플레이리스트 아이템 객체 생성
            PlaylistItem playlistItem = new PlaylistItem();
            playlistItem.setSnippet(snippet);

            // 플레이리스트 아이템 삽입 요청 생성 및 실행
            YouTube.PlaylistItems.Insert request = youtube.playlistItems().insert(Collections.singletonList("snippet"), playlistItem);
            PlaylistItem response = request.execute();

            System.out.println("Video added to playlist: " + response.getId());
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
