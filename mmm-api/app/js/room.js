
window.addEventListener('load', () => {

    // get namespace from the url
    let url = location.pathname.split('/');
    let namespace = url[url.length - 1];
    $title.innerText = `Namespace: ${namespace}`
    document.title = namespace
    
    
    // socket is the global object used to listen on incoming messages
    // and send (emit) ones to the server.
    let socket;
        
    // let username;
    
    function login(name) {
        // Create a socket connection
        socket = ioConnect()
        username = name;
        socket.emit('login', name)
    }
    
    
    function ioConnect() {
        // Connect to a namespace
        let socket = io('/' + namespace)
        // Handle exiting page
        window.onunload = () => {
            socket.close()
        }
    
        return socket;
            }
        })