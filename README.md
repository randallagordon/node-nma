# node-nma &nbsp; [![build status](https://secure.travis-ci.org/randallagordon/node-nma.png)](http://travis-ci.org/randallagordon/node-nma)

A Node.js library and CLI tool to send notifications via Notify My Android 

### Installation

    $ [sudo] npm install -g nma

### Usage

Follows the NMA API closely:

    $ nma -k apikey -a application -e event -d description -p priority -u url -c content-type

Complete usage details via ''nma --help'

    Usage: nma [options]

    Options:

      -h, --help                 output usage information
      -V, --version              output the version number
      -k, --apikey <key>         API key(s)
      -a, --application <app>    Name of the application generating the notification
      -e, --event <event>        Subject of the notification
      -d, --description <desc>   Full text of the notification
      -p, --priority [0]         -2 = Very Low; -1 = Moderate; 0 = Normal; 1 = High; 2 = Emergency
      -u, --url <url>            URL/URI to associate with the notification
      -c, --content-type [type]  Set to "text/html" and basic html will be rendered while displaying the notification

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
