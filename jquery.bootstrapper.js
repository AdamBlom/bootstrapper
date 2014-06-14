//Creating this as a jQuery function/plugin
jQuery.fn.bootstrapper = function (options) {
	//Process options
	var defaults = {
		'expand': 'Expand',
		'collapse': 'Collapse',
		'userClass': ''
	};
	
	var userOptions = $.extend(defaults, options); //this says to overwrite the the defaults object with values from the options, if present. Otherwise, use defaults. 

	var $root;
	function process ($menu) {
		//Add class to menu if JS is turned on. Adds bootstrapper-menu to class as well to associate whatever was passed in to the plugin. Makes it so there does not need to have specific classes in the HTML by default. JS will take care of it.
		$menu.addClass('bootstrapper-processed bootstrapper-menu bootstrapper-clearfix');
		//Wrap the menu
		$menu.wrap('<div class="bootstrapper ' + userOptions.userClass + '"></div>');
		//Assign the value of $root, which is declared above.
		$root = $menu.parent();
		// Add button to expando plugin
		$root.prepend('<button>' + userOptions.expand + '</button>');
	}
	// Save a reference to the menus
	var $menu = this;
	//Initiate the menu processing.
	process($menu);

	//Attach a click handler
	$root.on('click', 'button', function() { 
		var $button = $(this);
		var $menu = $button.next();
		var isOpen = $menu.hasClass('open'); 
		//Toggle if menu is opened or closed
		if (isOpen) { 
			$menu.removeClass('open');
			$menu.slideUp();
			$button.text(userOptions.expand);
		} else {
			$menu.addClass('open');
			$menu.slideDown();
			$button.text(userOptions.collapse);
		}
	});
	//Returns jQuery object for proper jQuery functionality.
	return this;
};