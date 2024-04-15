package com.cha.youtubemusic.controller;

import com.cha.youtubemusic.service.MusicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class MusicController {

    private final MusicService musicService;

    @Autowired
    public MusicController(MusicService musicService) {
        this.musicService = musicService;
    }

    @PostMapping("/api/addToPlaylist")
    public ResponseEntity<String> addToPlaylist(@RequestBody String song) {
        // 서비스를 호출하여 곡을 특정 재생목록에 추가
        boolean success = musicService.addToPlaylist(song);
        if (success) {
            return new ResponseEntity<>("Song added to playlist successfully!", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Failed to add song to playlist", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
