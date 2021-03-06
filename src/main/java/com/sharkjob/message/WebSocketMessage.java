package com.sharkjob.message;


import com.google.common.collect.ArrayListMultimap;
import com.google.common.collect.ListMultimap;
import com.google.common.collect.Multimaps;
import com.google.gson.Gson;
import com.sharkjob.controller.UserController;
import lombok.Data;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import lombok.Getter;
import lombok.Setter;

import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * Created by Chino on 2017/11/4.
 * Template of WebSocket Example for message system.
 * Not finished.
 * Need requirements!
 */
@ServerEndpoint("/messageSystem/{jobId}")
public class WebSocketMessage {
    private static ListMultimap<String, Session> jobSet = Multimaps.synchronizedListMultimap(ArrayListMultimap.<String, Session>create());
    @Setter
    @Getter
    private AtomicInteger connections = new AtomicInteger(0);
    private static final Logger log = LoggerFactory.getLogger(WebSocketMessage.class);

    @OnOpen
    public void onOpen(@PathParam("jobId") String jobId, Session session) {
        jobSet.put(jobId, session);
        connections.addAndGet(1);
        log.info("websocket connect :" + connections.get());
    }

    @OnMessage
    public void onMessage(String message, @PathParam("jobId") String jobId) {

        for (Session session1 : jobSet.get(jobId)) {
            session1.getAsyncRemote().sendText(message);
            log.info(message + " sent!");
        }
    }

    @OnError
    public void onError(Session session, Throwable error) {
        log.error(error.toString());
    }

    @OnClose
    public void onClose(@PathParam("jobId") String jobId, Session session) {
        jobSet.remove(jobId, session);
        connections.addAndGet(-1);
    }

    public Integer getChatRoomConnections(String jobId) {
        return jobSet.get(jobId).size();
    }

}
