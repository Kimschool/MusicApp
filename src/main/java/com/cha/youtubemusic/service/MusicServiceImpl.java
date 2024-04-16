package com.cha.youtubemusic.service;

import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.youtube.YouTube;
import com.google.api.services.youtube.model.PlaylistItem;
import com.google.api.services.youtube.model.PlaylistItemSnippet;
import com.google.api.services.youtube.model.ResourceId;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;

@Service
public class MusicServiceImpl implements MusicService {

    private final YouTube youtube;

    public MusicServiceImpl() {
        try {
            // YouTube API 초기화
            this.youtube = initializeYouTube();
        } catch (GeneralSecurityException | IOException e) {
            throw new RuntimeException("Error initializing YouTube API", e);
        }
    }

    private YouTube initializeYouTube() throws GeneralSecurityException, IOException {
        // HTTP 및 JSON 팩토리 초기화
        HttpTransport httpTransport = GoogleNetHttpTransport.newTrustedTransport();
        JsonFactory jsonFactory = JacksonFactory.getDefaultInstance();

        // YouTube 객체 초기화
        YouTube youtube = new YouTube.Builder(httpTransport, jsonFactory, null)
                .setApplicationName("My Project 89758")
                .build();

        return youtube;
    }

    @Override
    public boolean addToPlaylist(String song) {
        try {
            // 여기서 song 정보를 이용하여 YouTube에서 곡을 검색하고, 해당 곡의 비디오 ID를 얻어야 합니다.
            String videoId = getVideoIdFromSong(song);

            // 유튜브 재생목록에 곡을 추가하는 로직
            PlaylistItem playlistItem = new PlaylistItem();
            playlistItem.setSnippet(new PlaylistItemSnippet());
            playlistItem.getSnippet().setPlaylistId("PLyBo_4T8mx6C70DwXtj53lhG5SXEvaw3D"); // 여기에 재생목록 ID를 넣어주세요
            playlistItem.getSnippet().setResourceId(new ResourceId().setKind("youtube#video").setVideoId(videoId));

            youtube.playlistItems().insert(Collections.singletonList("snippet"), playlistItem).execute();

            return true; // 곡이 성공적으로 재생목록에 추가되었음을 반환
        } catch (IOException e) {
            e.printStackTrace();
            return false; // 곡 추가 실패시 false 반환
        }
    }

    // song 정보를 이용하여 비디오 ID를 검색하는 로직을 구현해야 합니다.
    private String getVideoIdFromSong(String song) {
        // song 정보를 이용하여 YouTube API를 호출하여 비디오 ID를 검색하는 로직을 구현해야 합니다.
        // 여기에 YouTube API 호출 및 비디오 ID를 가져오는 코드를 작성해주세요.
        // 예시로 임시로 고정된 비디오 ID를 반환합니다.
        return song;
    }
}
