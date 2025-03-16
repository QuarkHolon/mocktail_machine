/**
 * This is the default settings file provided by Node-RED.
 *
 * It can contain any valid JavaScript code that will get run when Node-RED
 * is started.
 *
 * Lines that start with // are commented out.
 * Each entry should be separated from the entries above and below by a comma ','
 *
 * For more information about individual settings, refer to the documentation:
 *    https://nodered.org/docs/user-guide/runtime/configuration
 *
 * The settings are split into the following sections:
 *  - Flow File and User Directory Settings
 *  - Security
 *  - Server Settings
 *  - Runtime Settings
 *  - Editor Settings
 *  - Node Settings
 *
 **/

// Load environment variables from nodered.env
require('dotenv').config({ path: `${process.env.HOME}/.node-red/nodered.env` });

// Log environment variables for debugging
console.log("Environment Variables:");
console.log("MYSQL_HOST:", process.env.MYSQL_HOST);
console.log("MYSQL_USER:", process.env.MYSQL_USER);
console.log("MYSQL_PASSWORD:", process.env.MYSQL_PASSWORD ? "***" : "Not set"); // Mask password for security
console.log("MYSQL_DB:", process.env.MYSQL_DB);
console.log("SMTP_USER:", process.env.SMTP_USER);
console.log("SMTP_PASS:", process.env.SMTP_PASS ? "***" : "Not set"); // Mask password for security
console.log("CREDENTIAL_SECRET:", process.env.CREDENTIAL_SECRET ? "***" : "Not set"); // Mask secret for security
console.log("PORT:", process.env.PORT);
console.log("USER_DIR:", process.env.USER_DIR);
console.log("HOME:", process.env.HOME);
console.log("ADMIN_USER:", process.env.ADMIN_USER);
console.log("ADMIN_PASS:", process.env.ADMIN_PASS ? "***" : "Not set");

module.exports = {

/*******************************************************************************
 * Flow File and User Directory Settings
 ******************************************************************************/

    mysql: {
        mocktails_management: {
            host: process.env.MYSQL_HOST || "127.0.0.1",
            user: process.env.MYSQL_USER || "default_user",
            password: process.env.MYSQL_PASSWORD || "default_pass",
            database: process.env.MYSQL_DB || "MOCKTAILS_DB"
        }
    },

    smtp: {
        user: process.env.SMTP_USER || "default_user@example.com",
        pass: process.env.SMTP_PASS || "default_password"
    },
    // Configuration SMTP
    email: {
    server: 'smtp.gmail.com', // Serveur SMTP (Gmail dans cet exemple)
    port: 465, // Port SMTP (465 pour SSL, 587 pour TLS)
    secure: true, // Utiliser SSL/TLS

    auth: {
      user: process.env.SMTP_USER, // Utilise la variable d'environnement SMTP_USER
      pass: process.env.SMTP_PASS // Utilise la variable d'environnement SMTP_PASS
        //Passée à la moulinette 
        //node -e "console.log(require('bcryptjs').hashSync('motdepasse', 8));"

    },
    tls: {
      rejectUnauthorized: false // Désactiver la vérification du certificat (optionnel)
    }
  },

    /** The file containing the flows. If not set, defaults to flows_<hostname>.json **/
    flowFile: 'flows.json',

    /** Specify your own secret for credential encryption. */
    credentialSecret: process.env.CREDENTIAL_SECRET ,

    /** Enable pretty-printing of the flow JSON for readability. */
    flowFilePretty: true,

    /** Set user directory for Node-RED configurations */
    userDir: process.env.USER_DIR || `${process.env.HOME}/.node-red`,

/*******************************************************************************
 * Security Settings
 ******************************************************************************/

    // Example admin authentication setup
     adminAuth: {
         type: "credentials",
         users: [{
             username: process.env.ADMIN_USER,
             password: process.env.ADMIN_PASS,
             permissions: "*"
         }]
     },

/*******************************************************************************
 * Server Settings
 ******************************************************************************/

    /* Déplace l'interface d'administration de Node-RED vers /admin */
     httpAdminRoot: '/admin',

    /** Set the port for Node-RED, with environment override */
    uiPort: process.env.PORT || 1880,

    /** Serve static files from the public directory */
    httpStatic: `${process.env.HOME}/.node-red/public`,
    httpStaticOptions: {
      extensions: ['html', 'css', 'js', 'png', 'jpg', 'jpeg', 'gif', 'svg'] // Exclude .html
    },

/*******************************************************************************
 * Runtime Settings
 ******************************************************************************/

    diagnostics: {
        enabled: true,
        ui: true,
    },

    runtimeState: {
        enabled: false,
        ui: false,
    },

/*******************************************************************************
 * Logging Settings
 ******************************************************************************/

    logging: {
        console: {
            level: "info",
            metrics: false,
            audit: false
        }
    },

/*******************************************************************************
 * External Modules
 ******************************************************************************/

    externalModules: {
        autoInstall: true,
        allowList: [
            '@node-red/nodes',
            'node-red-node-mysql',
            'node-red-node-websocket', // WebSocket communication
            'node-red-node-email',
            'node-red-dashboard',
            'node-red-node-file',
            'node-red-node-httprequest',
            'node-red-contrib-cron-plus',
            'node-red-contrib-web-worldmap',
            'node-red-contrib-ui-led',
            'node-red-contrib-moment',
            'node-red-contrib-owntracks',
            'node-red-contrib-google',
    'node-red-contrib-azure-iot-hub',
    'node-red-contrib-aws',
        ]

    },

/*******************************************************************************
 * Context Storage
 ******************************************************************************/

    // Uncomment if persistent context storage is required
    // contextStorage: {
    //     default: {
    //         module: "localfilesystem"
    //     },
    // },
   contextStorage: {
     default: {
       module: "localfilesystem"
     },
   }, 

/*******************************************************************************
 * Editor Settings
 ******************************************************************************/

    editorTheme: {
        projects: {
            enabled: false,
            workflow: {
                mode: "manual"
            }
        },
        codeEditor: {
            lib: "monaco",
            options: {
                // theme: "vs",
            }
        }
    },

/*******************************************************************************
 * Node Settings
 ******************************************************************************/

    functionExternalModules: true,
    functionTimeout: 0,
    exportGlobalContextKeys: false,

    // Expose environment variables to function nodes
    functionGlobalContext: {
        process: process,
        require: require,
        nodemailer: require('nodemailer') // Expose nodemailer for email functionality
    }
};

