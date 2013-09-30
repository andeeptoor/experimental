var NCHAINS = (function(nchains) {
 
    /**
     * Recursively generate a namespace.
     * @param hierarchy {array} of String identifiers identifying each component of the namespace hierarchy.
     * @param parentNamespace {namespace} The parent namespace.
     */
    function createNamespace( hierarchy, parentNamespace ) {
 
        if ( hierarchy.length == 1 ) {
            // create the namespace if it doesn't exist already.
            parentNamespace[ hierarchy[0] ] = parentNamespace[ hierarchy[0] ] || { };
        }
        else {
            // create the namespace if it doesn't exist already.
            var ns = parentNamespace[ hierarchy[0] ] = parentNamespace[ hierarchy[0] ] || { };
 
 
            // since we've created the name space, we iterate further, and create the namespace for the children.
            hierarchy.splice(0, 1);
            createNamespace ( hierarchy,  ns );
        }
    }
 
    /**
     * Creates the namespace specified by the namespace string.
     * @param namespace period delimited string value.
     */
    nchains.namespace = function(namespace) {
 
        if( typeof namespace == 'string') {
            var hierarchy = namespace.split(".");
            createNamespace( hierarchy, window ); // the starting namespace for everything is WINDOW
        }
        else {
            throw "NCHAINS.namespace( {String} namespace ) : expected namespace to be a String";
        }
 
    };
 
    return nchains;
 
 
})( NCHAINS || { } );