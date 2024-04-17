package com.cha.youtubemusic.service;

import com.cha.youtubemusic.auth.YouTubeAuth;
import com.google.api.client.auth.oauth2.Credential;
import com.google.api.services.youtube.YouTube;
import com.google.api.services.youtube.model.PlaylistItem;
import com.google.api.services.youtube.model.PlaylistItemSnippet;
import com.google.api.services.youtube.model.ResourceId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;
@Service
public class MusicServiceImpl implements MusicService {

    private final YouTube youtube;

    @Autowired
    public MusicServiceImpl(String song) {
        try {
            // YouTube API 초기화
            this.youtube = initializeYouTube(song);
        } catch (GeneralSecurityException | IOException e) {
            throw new RuntimeException("Error initializing YouTube API", e);
        }
    }

    private YouTube initializeYouTube(String song) throws GeneralSecurityException, IOException {
        // 사용자 권한을 인증하여 Credential 객체를 가져옴
        Credential credential = YouTubeAuth.authorize(song);

        // YouTube 객체 초기화
        return new YouTube.Builder(YouTubeAuth.HTTP_TRANSPORT, YouTubeAuth.JSON_FACTORY, credential)
                .setApplicationName("My Project 89758")
                .build();
    }

    @Override
    public boolean addToPlaylist(String song) {
        try {
            // 유튜브 재생목록에 곡을 추가하는 로직
            String videoId = getVideoIdFromSong(song);
            PlaylistItem playlistItem = new PlaylistItem();
            playlistItem.setSnippet(new PlaylistItemSnippet());
            playlistItem.getSnippet().setPlaylistId("PLyBo_4T8mx6C70DwXtj53lhG5SXEvaw3D");
            playlistItem.getSnippet().setResourceId(new ResourceId().setKind("youtube#video").setVideoId(videoId));
            youtube.playlistItems().insert(Collections.singletonList("snippet"), playlistItem).execute();
            return true;
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
    }

    // song 정보를 이용하여 비디오 ID를 검색하는 로직을 구현해야 합니다.
    private String getVideoIdFromSong(String song) {
        // 여기에 YouTube API 호출 및 비디오 ID를 가져오는 코드를 작성해주세요.
        // song 정보를 이용하여 YouTube API를 호출하여 비디오 ID를 검색하는 로직을 구현해야 합니다.
        // 예시로 임시로 고정된 비디오 ID를 반환합니다.
        return song;
    }
}
