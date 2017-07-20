// This is a module using an object literal pattern.
// It's an easy way to organize your custom JavaScript into modules with methods.
// Since this system uses Webpack, you can reuse other modules and dependencies
// by importing them into the module.


import * as core from "../core";
// Here's jQuery in case you need it. If you're just doing DOM manipulation, you
// probably won't need it. Recommend using core.dom module to handle node caching.
// import $ from "jquery/dist/jquery";
import * as sps from "../sqs";


let $_jsElements = null;


/**
 *
 * @public
 * @module sidebar
 * @description An example hook module.
 *
 */
const sidebar = {
    /**
     *
     * @public
     * @method init
     * @memberof example
     * @description Method runs once when window loads.
     *
     */
    init () {
        if ( this.isActive() ) {
            initElement();
        }
        // console.log( "sidebar module: initialized" );
    },


    /**
     *
     * @public
     * @method isActive
     * @memberof example
     * @description Method informs of active status.
     * @returns {boolean}
     *
     */
    isActive () {
        return (this.getElements() > 0);
    },


    /**
     *
     * @public
     * @method unload
     * @memberof example
     * @description Method performs unloading actions for this module.
     *
     */
    unload () {
        // Typically unloading and tearing down isn't required unless you're
        // using a complete AJAX Squarespace website that functions like
        // a single page application.
        this.teardown();
    },


    /**
     *
     * @public
     * @method teardown
     * @memberof example
     * @description Method performs cleanup after this module. Removes events, null vars etc...
     *
     */
    teardown () {
        $_jsElements = null;
    },


    /**
     *
     * @public
     * @method getElements
     * @memberof example
     * @description Method queries DOM for this modules node.
     * @returns {number}
     *
     */
    getElements () {
        $_jsElements = $( ".js-sidebar" );
        

        return ( $_jsElements.length );
    }
}; 


/**
 *
 * @private
 * @method execElement
 * @memberof example
 * @description Handles execution of something.
 * @param {jQuery} $element The element.
 *
 */
const execElement = function ( $element ) {
    
    const contentArea = $( ".Main.Main--blog-list" );
    const sidebarData = $element.data();
    const url = sidebarData.url;
    let mainContent = null;

    core.api.fetch( url, { format: "json" } )
        .then( ( response ) => {
            return response.json();
        }).then( ( json ) => {
            mainContent = json.mainContent;
        }).then( () => {
            
            contentArea.append( mainContent );
            contentArea.find( '.sqs-layout[data-type="page"]' ).addClass( "custom-sidebar" );
            
            window.Squarespace.AFTER_BODY_LOADED = false;
            window.Squarespace.afterBodyLoad(); 

            $element.addClass( "is-loaded" );
        
        });
};


/**
 *
 * @private
 * @method initElement
 * @memberof example
 * @description This module would do something with your elements.
 *
 */
const initElement = function ( ) {
    const $notLoaded = $_jsElements.not( ".is-initialized" );
    let $element = null;
    let i = $notLoaded.length;

    for ( i; i--; ) {
        $element = $_jsElements.eq( i );

        $element.addClass( "is-initialized" );

        execElement( $element );
    }
};



/******************************************************************************
 * Export
*******************************************************************************/
export default sidebar;