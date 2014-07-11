(function(){
    function start_socket () {
        /*
         * opens socket, initializes socket events/callbacks, requests initial list
         *
         * @returns websocket
         */
        
        // open the socket
        var socket = new WebSocket("ws://localhost:8000/socketserver");
        window.socket = socket

        // initialize socket event handlers
        socket.onmessage = function (event) {
            debugger
            var message = event;

            if (typeof message["initialize_tickets"] !== 'undefined'){
                debugger
                initialize_tickets(message);
            } else if (message === "add:ticket") {
                add_ticket(message);
            } else if (message === "remove:ticket") {
                remove_ticket(message);
            } else {
                debugger
                alert("Helperbot malfunction! Refresh your browser ;_;")
            }
        };   
        
        // ask for the initial list of tickets
        socket.onopen = function(){
            socket.send("test");
            //socket.send("get:list");
        };

        return socket;
    }

    function add_ticket (message) {
        /*
         * adds a ticket to the list
         *
         * @param message - websocket message passed from 'add:ticket' event
         */

        var new_ticket = "<li class='" + message.name +"'>" + message.name + "needs help";
        
        if (typeof message.instructor !== 'undefined') {
            new_ticket = new_ticket + " from <span>" + message.instructor + "</span>";
        }

        $("ul.current-tickets").append(new_ticket + "</li>"); 
    }

    function remove_ticket (message) {
        /*
         * removes a ticket from the list
         *
         * @param message - websocket message passed from 'remove:ticket'
         */

        $("li." + message.name).remove();

    }

    function initialize_tickets (list) {
        /*
         * creates the initial list of tickets
         *
         * @param list - websocket message passed from 'initialize_tickets'
         */

        for (var i; i < list.length; i++) {
            add_ticket(list[i]);
        }
    }

    function submit_new (socket, e) {
        /*
         * sends websocket message to backend for new ticket
         *
         * @param socket - websocket
         * @param e - click event
         */

        debugger
        e.preventDefault();
        socket.send({
            "new_ticket": $("#new_ticket").serialize() // this is a string of the form data
        });
    }

    function mark_ticket_complete (socket, e) {
        /*
         * when user clicks on remove ticket, send message to websocket
         *
         * @param socket - websocket
         * @param e - click event 
         */

        socket.send({"remove:ticket": "ticket" })
    }

    function main () {
        var socket = start_socket();

        $("[type='submit']").click(function (anything) {
            debugger
            submit_new(socket,e) })
        $(".remove").click(function (e) { mark_ticket_complete(socket,e) })
    }   

    main ();
})();
