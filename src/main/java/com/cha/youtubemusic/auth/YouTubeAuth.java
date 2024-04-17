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

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.security.GeneralSecurityException;
import java.util.Collections;

public class YouTubeAuth {

    private static final String CLIENT_SECRETS_FILE = "client_secret.json";
    private static final String REDIRECT_URI = "http://localhost:8080";

    public static final JsonFactory JSON_FACTORY = JacksonFactory.getDefaultInstance();
    public static final HttpTransport HTTP_TRANSPORT;

    static {
        try {
            HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport();
        } catch (GeneralSecurityException | IOException e) {
            throw new RuntimeException(e);
        }
    }

    public static Credential authorize(String song) throws IOException, GeneralSecurityException {
        // Load client secrets
        InputStream in = YouTubeAuth.class.getResourceAsStream(CLIENT_SECRETS_FILE);
        GoogleClientSecrets clientSecrets = GoogleClientSecrets.load(JSON_FACTORY, new InputStreamReader(in));

        // Build flow and trigger user authorization request
        GoogleAuthorizationCodeFlow flow = new GoogleAuthorizationCodeFlow.Builder(
                HTTP_TRANSPORT, JSON_FACTORY, clientSecrets, Collections.singletonList("https://www.googleapis.com/auth/youtube.force-ssl"))
                .build();

        // Pass the song value to getVideoIdFromSong method
        String videoId = getVideoIdFromSong(song);

        return new AuthorizationCodeInstalledApp(flow, new LocalServerReceiver()).authorize("user");
    }

    // You may need to modify this method to actually fetch the video ID from YouTube using the song information
    private static String getVideoIdFromSong(String song) {
        // Implement logic to fetch the video ID from YouTube based on the song information
        // For now, let's just return the song as the video ID
        return song;
    }
}
