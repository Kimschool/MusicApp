package com.cha.youtubemusic.auth;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.client.extensions.jetty.auth.oauth2.LocalServerReceiver;
import com.google.api.client.extensions.java6.auth.oauth2.AuthorizationCodeInstalledApp;
import com.google.api.client.util.store.FileDataStoreFactory;

import java.io.IOException;
import java.io.InputStreamReader;
import java.security.GeneralSecurityException;
import java.util.Collections;

public class YouTubeAuth {

    private static final String CLIENT_SECRETS_FILE = "client_secret.json";
    private static final String REDIRECT_URI = "http://localhost:8080";

    public static final JsonFactory JSON_FACTORY = JacksonFactory.getDefaultInstance();
    public static final HttpTransport HTTP_TRANSPORT;

    private static final String TOKENS_DIRECTORY_PATH = "tokens";

    private static GoogleAuthorizationCodeFlow flow;

    public static final String APPLICATION_NAME = "weavus";

    static {
        try {
            HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport();
        } catch (GeneralSecurityException | IOException e) {
            throw new RuntimeException(e);
        }
    }

    public static Credential authorize() throws IOException, GeneralSecurityException {
        // 로컬 파일에서 API 클라이언트 비밀을로드합니다.
        GoogleClientSecrets clientSecrets = GoogleClientSecrets.load(JSON_FACTORY,
                new InputStreamReader(YouTubeAuth.class.getResourceAsStream("/client_secret.json")));

        // HTTP 트랜스포트 초기화
        HttpTransport httpTransport = GoogleNetHttpTransport.newTrustedTransport();

        // 인증을위한 데이터 저장소 설정
        FileDataStoreFactory dataStoreFactory = new FileDataStoreFactory(new java.io.File(TOKENS_DIRECTORY_PATH));

        // 승인 코드 플로 생성
        flow = new GoogleAuthorizationCodeFlow.Builder(
                httpTransport, JSON_FACTORY, clientSecrets,
                Collections.singletonList("https://www.googleapis.com/auth/youtube.force-ssl"))
                .setDataStoreFactory(dataStoreFactory)
                .setAccessType("offline")
                .build();

        // 로컬 웹 서버를 시작하고 사용자 인증을 요청합니다.
        Credential credential = new AuthorizationCodeInstalledApp(flow, new LocalServerReceiver())
                .authorize("user");

        return credential;
    }


    // You may need to modify this method to actually fetch the video ID from YouTube using the song information
    public static String getVideoIdFromSong(String song) {
        // Implement logic to fetch the video ID from YouTube based on the song information
        // For now, let's just return the song as the video ID
        return song;
    }
}
