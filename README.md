# node-nma #####################################################################

A Node.js library and CLI tool to send notifications via Notify My Android 

### Installation

    $ [sudo] npm install -g nma

### Usage

Follows the NMA API closely:

    $ nma apikey application event description priority url content-type

### Code Example

    var nma = require("nma");

    nma( "02cfc1a5f4e567929c31c13953e1adef247118562f148f7a",
         "Your App",
         "An Event",
         "And a description of that event...",
         0, // Priority
         "http://www.somewebsite.com/" );

### TODO

 - More intelligent CLI tool with input validation
 - Constructor to setup some defaults (apikey, application, content-type) 
 - Handle calls with multiple API keys
 - Silent and verbose output
 - ??? - Feel free to open an Issue or submit a Pull Request!

## License #####################################################################

MIT
