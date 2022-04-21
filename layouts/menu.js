const Menu = [
    {
        title: "Productos",
        group: "menu1",
        icon: "mdi-terrain",
        items:[
            { 
                title: "Menu 1",
                group: "menu1",
                name: "#"
            },
            {   
                title: "Menu 2",
                group: "menu2",
                name: "#",
                items:[
                    {
                        title: "Menu 2.1",
                        group: "menu2",
                        name: "#"
                    }
                ]
            },
            { 
                title: "Menu",
                group: "menu1",
                name: "#"
            }
        
        ]
    },
    {
        title: "Fotos",
        group: "menu2",
        icon: "mdi-terrain",
        items:[
            { 
                title: 'menu 2',
                name:"#",
            }
        ]
    }
  ];

  export default Menu;