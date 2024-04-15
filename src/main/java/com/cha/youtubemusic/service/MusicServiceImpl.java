package com.cha.youtubemusic.service;

import com.google.api.services.youtube.YouTube;
import com.google.api.services.youtube.model.PlaylistItem;
import com.google.api.services.youtube.model.PlaylistItemSnippet;
import com.google.api.services.youtube.model.ResourceId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Collections;

@Service
public class MusicServiceImpl implements MusicService {

    private final YouTube youtube;

    @Autowired
    public MusicServiceImpl(YouTube youtube) {
        this.youtube = youtube;
    }

    @Override
    public boolean addToPlaylist(String song) {
        try {
            // 여기서 유튜브 API를 사용하여 song 정보를 이용하여 유튜브에서 곡을 검색하고,
            // 해당 곡의 비디오 ID를 얻어야 합니다.
            String videoId = getVideoIdFromSong(song); // 예시: 유튜브에서 곡을 검색하여 비디오 ID를 가져오는 메서드

            // 유튜브 재생목록에 곡을 추가하는 로직
            PlaylistItem playlistItem = new PlaylistItem();
            playlistItem.setSnippet(new PlaylistItemSnippet());
            playlistItem.getSnippet().setPlaylistId("PLyBo_4T8mx6C70DwXtj53lhG5SXEvaw3D");
            playlistItem.getSnippet().setResourceId(new ResourceId().setKind("youtube#video").setVideoId(videoId));

            youtube.playlistItems().insert(Collections.singletonList("snippet"), playlistItem).execute();

            return true; // 곡이 성공적으로 재생목록에 추가되었음을 반환
        } catch (IOException e) {
            e.printStackTrace();
            return false; // 곡 추가 실패시 false 반환
        }
    }

    // 이곳에는 유튜브 API를 사용하여 song 정보를 이용하여 비디오 ID를 검색하는 로직을 추가해야 합니다.
    private String getVideoIdFromSong(String song) {
        // 유튜브 API를 사용하여 song 정보를 이용하여 비디오 ID를 검색하는 로직을 구현해야 합니다.
        // 예시로 임시로 고정된 비디오 ID를 반환합니다.
        return "YOUR_VIDEO_ID";
    }
}
