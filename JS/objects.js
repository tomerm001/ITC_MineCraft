// JS for object


var elements = {
    toolbox: {},
    resource: {},
    trees: [],
    stone: []
}




elements.toolbox.axe = {
    src: "./Images/axe.png",
    interaction: 1,
    type: 'tool',
}

elements.toolbox.pickaxe = {
    src: "./Images/pickaxe.png",
    interaction: 2,
    type: 'tool'
}

elements.toolbox.shovel = {
    src: "./Images/shovel.png",
    interaction: 3,
    type: 'tool'
}

elements.resource.dirt = {
    src: "./Images/dirt.png",
    interaction: 3,
    type: 'resource'
}

elements.resource.grass = {
    src: "./Images/grass.png",
    interaction: 3,
    type: 'resource'
}

elements.resource.leaf = {
    src: "./Images/leaf.png",
    interaction: 1,
    type: 'resource'
}

elements.resource.rock = {
    src: "./Images/rock.png",
    interaction: 2,
    type: 'resource'
}

elements.resource.tree = {
    src: "./Images/tree.png",
    interaction: 1,
    type: 'resource'
}




elements.trees[0] = [   ['leaf','leaf' ,'leaf'],
                        ['leaf','leaf' ,'leaf'],
                        ['leaf','leaf' ,'leaf'],
                        ['leaf','leaf' ,'leaf'],
                        ['leaf','leaf' ,'leaf'],
                        ['sky','tree','sky'],
                        ['sky','tree','sky'],
                        ['sky','tree','sky'],
                        ['sky','tree','sky'],
                        ['sky','tree','sky'],
                        ['sky','tree','sky']
                    ]

elements.trees[1] = [   ['sky','leaf' ,'leaf', 'leaf' ,'sky'],
                        ['leaf','leaf' ,'leaf', 'leaf' ,'leaf'],
                        ['leaf','leaf' ,'leaf', 'leaf' ,'leaf'],
                        ['leaf','leaf' ,'leaf', 'leaf' ,'leaf'],
                        ['leaf','leaf' ,'leaf', 'leaf' ,'leaf'],
                        ['leaf','leaf' ,'leaf', 'leaf' ,'leaf'],
                        ['sky','leaf' ,'leaf', 'leaf' ,'sky'],
                        ['sky','sky','tree','sky','sky'],
                        ['sky','sky','tree','sky','sky'],
                        ['sky','sky','tree','sky','sky'],
                        ['sky','sky','tree','sky','sky'],
                        ['sky','sky','tree','sky','sky'],
                        ['sky','sky','tree','sky','sky']
                    ]

elements.trees[2] = [   ['sky','leaf' ,'sky'],
                        ['sky','leaf' ,'sky'],
                        ['leaf','leaf' ,'leaf'],
                        ['leaf','leaf' ,'leaf'],
                        ['sky','leaf' ,'sky'],
                        ['leaf','leaf' ,'leaf'],
                        ['sky','leaf' ,'sky'],
                        ['sky','tree','sky'],
                        ['sky','tree','sky'],
                        ['sky','tree','sky'],
                        ['sky','tree','sky'],
                        ['sky','tree','sky']
                    ]


elements.trees[3] = [   ['sky','leaf' ,'leaf', 'leaf' ,'leaf'],
                        ['sky','leaf' ,'leaf', 'leaf' ,'leaf'],
                        ['leaf','leaf' ,'leaf', 'leaf' ,'leaf'],
                        ['sky','leaf' ,'leaf', 'leaf' ,'sky'],
                        ['sky','leaf' ,'leaf', 'leaf' ,'sky'],
                        ['leaf','leaf' ,'leaf', 'leaf' ,'sky'],
                        ['leaf','leaf' ,'leaf', 'leaf' ,'sky'],
                        ['sky','sky','tree','sky','sky'],
                        ['sky','sky','tree','sky','sky'],
                        ['sky','sky','tree','sky','sky'],
                        ['sky','sky','tree','sky','sky'],
                        ['sky','sky','tree','sky','sky']
                    ]

elements.trees[4] = [ 
                        ['sky','sky','leaf','sky','sky'],
                        ['sky','leaf','leaf','leaf','sky'],
                        ['leaf','leaf','leaf','leaf','sky'],
                        ['leaf','leaf','leaf','leaf','leaf']
                    ]


elements.stone[0] = [ 
                        ['rock','rock','rock'],
                        ['rock','rock','rock']
                    ]

elements.stone[1] = [   
                        ['rock','rock','dirt'],
                        ['rock','rock','dirt'],
                        ['dirt','rock','rock']
                    ]

elements.stone[2] = [   
                        ['rock','rock'],
                    ]

elements.stone[3] = [   
                        ['rock'],
                        ['rock'],
                    ]
