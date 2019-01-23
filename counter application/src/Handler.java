import java.io.*;
import java.net.Socket;
import java.util.*;

public class Handler implements Runnable {
	
	//constructs
    private LinkedList <String> args = new <String> LinkedList();
    private StringBuilder sb = new StringBuilder();
    
	private BufferedReader br;
    private PrintWriter pw;
    
	//associated socket
	private Socket clientSocket;

	//list of active clients
    private Clients clients;
	
	//finals
    private static final boolean AUTOFLUSH = true;
    private static final String SERVER_ID_HEADER = "Server: Httpd 1.0";
    private static final String HTTP_GET_METHOD = "GET";
    private static final String HTTP_OK_RESPONSE = "HTTP/1.0 200 OK";
    private static final String NOT_FOUND_RESPONSE = "HTTP/1.0 404 File Not Found";
    private static final String NOT_FOUND_HTML = "<HTML><HEAD><TITLE>File Not Found</TITLE></HEAD><BODY><H1>HTTP Error 404: File Not Found</H1></BODY></HTML>";
    private static final String HTTP_NOT_IMPL_RESPONSE = "HTTP/1.0 501 Not Implemented";
    private static final String NOT_IMPL_HTML = "<HTML><HEAD><TITLE>Not Implemented</TITLE></HEAD><BODY><H1>HTTP Error 501: Not Implemented";

    public Handler(Socket s, Clients c){
        this.clients = c;
        this.clientSocket = s;
    }

    public void run(){
        try{
			//initiate higher level abstraction for input and output on socket
            br = new BufferedReader(new InputStreamReader(clientSocket.getInputStream())); 
            pw = new PrintWriter(clientSocket.getOutputStream(), false);
            
			//normally http get is one line of data
			String line = br.readLine();
            String[] temporary = line.split(" ");

            for(String ins : temporary){
                System.out.println(ins);
                args.push(ins);
            }

			//continue to read input if there are more lines
            while ((line = br.readLine()) != null && !line.trim().equals("")) {
                sb.append(line);
            }

            if(args.poll().startsWith("HTTP/")) {
				//first string in input
                String s = args.poll();
				//second string in input
                String req = args.poll();

				//clients have a stringbuilder object as data
				//possible vulnarability (DOS) when many different ip-addresses connect
                if (!clients.hasClient(clientSocket.getInetAddress())) {
                    clients.addClient(clientSocket.getInetAddress(), new StringBuilder(s));
                } else {
                    clients.incScore(clientSocket.getInetAddress());
                    System.out.println(clients.score);
                }
				//respond to server and reply with no accesses (score)
                if (req.equals(HTTP_GET_METHOD)) {
                    pw.println(HTTP_OK_RESPONSE);
                    pw.println("Date:" + java.time.LocalDate.now());
                    pw.println(SERVER_ID_HEADER);
                    pw.println("Content-type: " + "text/html");
                    pw.println();
                    pw.print(" Score " + Integer.toString(clients.getScore(clientSocket.getInetAddress())));
                    pw.flush();
                } else {
                    notImplemented();
                }
            }
        }catch(IOException e){
            //System.err.println(e);
        }finally{
          try{
              clientSocket.close();
          }catch(IOException e){
		    //System.err.println(e);
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
}
