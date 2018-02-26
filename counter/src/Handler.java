import java.io.*;
import java.net.Socket;
import java.util.*;

public class Handler implements Runnable {

    private LinkedList <String> args = new <String> LinkedList();
    private StringBuilder sb = new StringBuilder();
    private BufferedReader br;
    private PrintWriter pw;
    private Socket clientSocket;
    private OutputStream outStream;
    private Clients clients;
    private StringBuilder hidden;

    private static final boolean AUTOFLUSH = true;
    private static final String SERVER_ID_HEADER = "Server: Httpd 1.0";
    private static final String HTTP_GET_METHOD = "GET";
    private static final String HTTP_OK_RESPONSE = "HTTP/1.0 200 OK";
    private static final String NOT_FOUND_RESPONSE = "HTTP/1.0 404 File Not Found";
    private static final String NOT_FOUND_HTML = "<HTML><HEAD><TITLE>File Not Found</TITLE></HEAD><BODY><H1>HTTP Error 404: File Not Found</H1></BODY></HTML>";
    private static final String HTTP_NOT_IMPL_RESPONSE = "HTTP/1.0 501 Not Implemented";
    private static final String NOT_IMPL_HTML = "<HTML><HEAD><TITLE>Not Implemented</TITLE></HEAD><BODY><H1>HTTP Error 501: Not Implemented";
    private static final String hangmanHead = "<HTML><HEAD><TITLE>HANGMAN</TITLE></HEAD><BODY>";
    private static final String hangmanTail = "</BODY></HTML>";

    public Handler(Socket s, Clients c){
        this.clients = c;
        this.clientSocket = s;
    }

    public void run(){
        try{
            br = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
            outStream = clientSocket.getOutputStream();
            pw = new PrintWriter(outStream, false);
            String line = br.readLine();
            String[] tempo = line.split(" ");

            for(String ins : tempo){
                System.out.println(ins);
                args.push(ins);
            }

            while ((line = br.readLine()) != null && !line.trim().equals("")) {
                sb.append(line);
            }
            if(args.poll().startsWith("HTTP/")) {
                String s = args.poll();
                //if (isUpvote(s)) {
                    String req = args.poll();

                    if (!clients.hasClient(clientSocket.getInetAddress())) {
                        clients.addClient(clientSocket.getInetAddress(), new StringBuilder(s));
                    } else {
                        hidden = clients.getHidden(clientSocket.getInetAddress());
                        clients.incScore(clientSocket.getInetAddress());
                        System.out.println(clients.score);
                    }

                    if (req.equals(HTTP_GET_METHOD)) {
                        pw.println(HTTP_OK_RESPONSE);
                        pw.println("Date:" + java.time.LocalDate.now());
                        pw.println(SERVER_ID_HEADER);
                        pw.println("Content-type: " + getMimeFromExtension("hangman.html"));
                        pw.println();
                        //pw.print(hangmanHead + hidden.substring(0, hidden.capacity() / 3) + hangmanTail);
                        pw.print(" Score " + Integer.toString(clients.getScore(clientSocket.getInetAddress())));
                        pw.flush();

                    } else {
                        notImplemented();
                    }
                //} else {
                    //notImplemented();
                //}
            }
        }catch(IOException e){
            //System.out.println(e);
        }finally{
          try{
              clientSocket.close();
          }catch(IOException e){
          }
        }
    }

    private void notImplemented(){
        pw.println(NOT_FOUND_RESPONSE);
        pw.println("Date:" + (new Date()));
        pw.println(SERVER_ID_HEADER);
        pw.println("Content-type: text/html");
        pw.println();
        pw.print(HTTP_NOT_IMPL_RESPONSE);
        pw.flush();
    }
    private boolean isUpvote(String s) { return (s.equals("upvote"));}
    private boolean isCommand(String s) {
        return (s.length()>0);
    }
    private boolean isLetter(String s) {
        return (s.length()==1);
    }
    private String getMimeFromExtension(String name) {

        if (name.endsWith(".html") || name.endsWith(".htm")) {
            return "text/html";
        } else if (name.endsWith(".txt") || name.endsWith(".java")) {
            return "text/plain";
        } else if (name.endsWith(".gif")) {
            return "image/gif";
        } else if (name.endsWith(".class")) {
            return "application/octet-stream";
        } else if (name.endsWith(".jpg") || name.endsWith(".jpeg")) {
            return "image/jpeg";
        } else if (name.endsWith(".css")) {
            return "stylecheet/css";
        }else {
            return "text/plain";
        }
    }
}
