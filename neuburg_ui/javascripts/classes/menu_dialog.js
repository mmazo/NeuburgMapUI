/**
 * MenuDialog is responsible for rendring menu navigation and for related
 * actions
 * @author mmazo
 * 
 * @param {Object} targetId - wrapper element id
 * @param {Object} mode - menu dialog mode (0 = not logged; 1 = logged)
 */
function MenuDialog(targetId,mode){
	
	/**
	 * DOM id of currently active menu element
	 */
	MenuDialog.activeMenuId = null;
	
	/**
	 * wrapper element
	 */
	var wrapper = $(targetId);
	
	/**
	 * menu html content
	 */
	var htmlContent = "";
	
	/**
	 * to about dialog
	 */
	MenuDialog.toAboutDialog = function(){
		new AboutDialog();
	};
	
	/**
	 * to daily news dialog
	 */
	MenuDialog.toDailyNewsDialog = function(){
		new DailyNews();
	};
	
	/**
	 * to help dialog
	 */
	MenuDialog.toHelptDialog = function(){
		new HelpDialog();
	};
	
	/**
	 * to login dialog
	 */
	MenuDialog.toLoginDilaog = function(){
		new LoginDialog();
	};
	
	/**
	 * logout action
	 */
	MenuDialog.logout = function(){
		MenuDialog.switchMode(0);
	};
	
	/**
	 * to map navigator
	 */
	MenuDialog.toMapNavigator = function(){
		if (!MAP_NAVIGATOR){
			MAP_NAVIGATOR = new MapNavigator();
		}else{
			if (MAP_NAVIGATOR.object.visible() === false){
				MAP_NAVIGATOR.show();
			}else{
				MAP_NAVIGATOR.hide();
			}
		}
	};
	
	/**
	 * to my map elements dialog
	 */
	MenuDialog.toMyMapElementsDialog = function(){
		new MyMapElementsDialog();
	};
	
	/**
	 * to raitings and statistics dialog
	 */
	MenuDialog.toRaitingsAndStatisticsDialog = function(){
		new RaitingsAndStatisticsDialog();
	};
	
	/**
	 * to register dialog
	 */
	MenuDialog.toRegisterDialog = function(){
		new RegisterDialog();
	};
	
	/**
	 * to search deialog
	 */
	MenuDialog.toSearchDialog = function(){
		new SearchDialog();
	};
	
	/**
	 * to user page settings dialog
	 */
	MenuDialog.toUserPageSettingsDialog = function(){
		new UserPageSettingsDialog();
	};
	
	/**
	 * assigns hover events to menu buttons
	 */
	function assignHoverEvents(){
		var btns = document.getElementsByClassName('menuBtnNormal');
		for (i = 0; i < btns.length; i++){
			/*
			 * mouseover
			 */
			Event.observe(btns[i], 'mouseover', function(event) {
				var elem = Event.element(event);
				if (elem.id != MenuDialog.activeMenuId){
					elem.className = 'menuBtnOver';	
				}
			});

			/*
			 * mouseout
			 */
			Event.observe(btns[i], 'mouseout', function(event) {
				var elem = Event.element(event);
				if (elem.id != MenuDialog.activeMenuId){
					elem.className = 'menuBtnNormal';
				}
			});
			
			/*
			 * mousedown
			 */
			Event.observe(btns[i], 'mousedown', function(event) {
				var elem = Event.element(event);
				if (elem.id != MenuDialog.activeMenuId){
					var btns = document.getElementsByClassName('menuBtnPressed');
					if (btns.length > 0){btns[0].className = 'menuBtnNormal';}
					MenuDialog.activeMenuId = elem.id;
					elem.className = 'menuBtnPressed';
				}
			});
		}
	};
	
	/**
	 * assigns unlogged menu buttons events
	 */
	function assignUnloggedMenuEvents(){
		/* about */
		Event.observe($('btnAbout'), 'click', function(event){
			MenuDialog.toAboutDialog();
		});
		/* news */
	    Event.observe($('btnNews'), 'click', function(event){
			MenuDialog.toDailyNewsDialog();
		});
		/* statistics */
		Event.observe($('btnStatistics'), 'click', function(event){
			MenuDialog.toRaitingsAndStatisticsDialog();
		});
		/* search */
		Event.observe($('btnSearch'), 'click', function(event){
			MenuDialog.toSearchDialog();
		});
		/* register */
		Event.observe($('btnRegister'), 'click', function(event){
			MenuDialog.toRegisterDialog();
		});
		/* login */
		Event.observe($('btnLogin'), 'click', function(event){
			MenuDialog.toLoginDilaog();
		});
	};
	
	/**
	 * assigns logged menu buttons events
	 */
	function assignLoggedMenuEvents(){
		/* news */
		Event.observe($('btnNews'), 'click', function(event){
			MenuDialog.toDailyNewsDialog();
		});
		/* statistics */
		Event.observe($('btnStatistics'), 'click', function(event){
			MenuDialog.toRaitingsAndStatisticsDialog();
		});
		/* my page */
		Event.observe($('btnMyPage'), 'click', function(event){
			MenuDialog.toUserPageSettingsDialog();
		});
		/* my property */
		Event.observe($('btnMyProperty'), 'click', function(event){
			MenuDialog.toMyMapElementsDialog();
		});
		/* search */
		Event.observe($('btnSearch'), 'click', function(event){
			MenuDialog.toSearchDialog();
		});
		/* help */
		Event.observe($('btnHelp'), 'click', function(event){
			MenuDialog.toHelptDialog();
		});
		/* logout */
		Event.observe($('btnLogout'), 'click', function(event){
			MenuDialog.logout();
		});
	};
	
	/**
	 * creates menu button html string
	 * @param {Object} id - buttons dom id
	 * @param {Object} title - buttons title
	 */
	function menuButton(id, title){
		var btn = "<button id='" + id + "' class='menuBtnNormal' " + 
		          " > " + title + " </button>";
		return btn;
	};
	
	/**
	 * switches the menu mode
	 * @param {Object} newMode
	 */
	MenuDialog.switchMode = function(newMode){
		switch (newMode*1){
			case 0 : htmlContent = menuButton('btnAbout','About Project') +
					               menuButton('btnNews','News') +  
								   menuButton('btnStatistics','Statistics') +
								   menuButton('btnSearch','Search') +
								   menuButton('btnRegister','Registration') +
								   menuButton('btnLogin','Login');
					 wrapper.innerHTML = htmlContent;
					 assignUnloggedMenuEvents();
					 assignHoverEvents();
			break;
			case 1 : htmlContent = menuButton('btnNews','News') +
					               menuButton('btnStatistics','Statistics') +
								   menuButton('btnMyPage','My Page') +
								   menuButton('btnMyProperty','My Property') +
								   menuButton('btnSearch','Search') +
								   menuButton('btnHelp','Help') +
								   menuButton('btnLogout','Logout'); 
			         wrapper.innerHTML = htmlContent;
					 assignLoggedMenuEvents();
					 assignHoverEvents();
			break;
		}	
	};
	
	
	
	/*
	 * assign corresponding html content and actions
	 */
	MenuDialog.switchMode(mode*1);
	
}
