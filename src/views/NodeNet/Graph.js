import G6 from "@antv/g6";

const f2 = {
    type: 'force2',
    animate: true,
    center: [500, 400],
    // distanceThresholdMode: 'max',
    damping: 0.5,
    gravity: 15,
    preventOverlap: true,
    nodeSize: 70,
    linkDistance: 25,
}

export class Graph {
    graph
    data
    isSelect
    constructor(width, height, container) {
        this.graph = new G6.Graph({
            width: width,
            height: height,
            container: container,
            renderer: 'canvas',
            animate: true,
            animateCfg: {
                duration: 800,
                easing: 'linearEasing',
            },
            defaultNode: {
                type: 'circle',
                style: {
                    stroke: null,
                },
                labelCfg: {
                    position: 'top',
                    style: {
                        fontSize: 10,
                    },
                },
            },
            defaultEdge: {
              type: 'can-running',
            },
            layout: f2,
            modes: {
                default: [
                    {
                        type: 'drag-canvas',
                        enableOptimize: true,
                    },
                    'drag-node',
                ]
            },
            nodeStateStyles: {
                hover: {
                    fill: 'lightsteelblue',
                },
                click: {
                    stroke: 'lightsteelblue',
                    lineWidth: 3,
                },
            },
            plugins: []
        });
    }

    async setLayout() {
        this.graph.updateLayout({type: 'force2'})
    }

    setAnimate(){
        G6.registerNode(
            'major',
            {
                afterDraw(cfg, group) {
                    let r = cfg.size / 2;
                    if (isNaN(r)) {
                        r = cfg.size[0] / 2;
                    }
                    const back1 = group.addShape('circle', {
                        zIndex: -3,
                        attrs: {
                            x: 0,
                            y: 0,
                            r,
                            fill: 'lightgray',
                            opacity: 0.6,
                        },
                        name: 'circle-shape1',
                    });
                    const back2 = group.addShape('circle', {
                        zIndex: -2,
                        attrs: {
                            x: 0,
                            y: 0,
                            r,
                            fill: 'gray',
                            opacity: 0.6,
                        },
                        name: 'circle-shape2',
                    });
                    const back3 = group.addShape('circle', {
                        zIndex: -1,
                        attrs: {
                            x: 0,
                            y: 0,
                            r,
                            fill: 'skyblue',
                            opacity: 0.6,
                        },
                        name: 'circle-shape3',
                    });
                    group.sort();
                    back1.animate(
                        {
                            r: r + 10,
                            opacity: 0.1,
                        },
                        {
                            repeat: true,
                            duration: 3000,
                            easing: 'easeCubic',
                            delay: 0,
                        },
                    );
                    back2.animate(
                        {
                            r: r + 10,
                            opacity: 0.1,
                        },
                        {
                            repeat: true,
                            duration: 3000,
                            easing: 'easeCubic',
                            delay: 1000,
                        },
                    );
                    back3.animate(
                        {
                            r: r + 10,
                            opacity: 0.1,
                        },
                        {
                            repeat: true,
                            duration: 3000,
                            easing: 'easeCubic',
                            delay: 2000,
                        },
                    );
                },
            },
            'circle',
        );
        const lineDash = [4, 2, 1, 2];
        G6.registerEdge(
            'can-running',
            {
                setState(name, value, item) {
                    const shape = item.get('keyShape');
                    if (name === 'running') {
                        if (value) {
                            let index = 0;
                            shape.animate(
                                () => {
                                    index++;
                                    if (index > 9) {
                                        index = 0;
                                    }
                                    return {
                                        lineDash,
                                        lineDashOffset: -index,
                                    };
                                },
                                {
                                    repeat: true,
                                    duration: 3000,
                                },
                            );
                        } else {
                            shape.stopAnimate();
                            shape.attr('lineDash', null);
                        }
                    }
                },
            },
            'line',
        );
    }

    loadData(data){
        this.data = data
        this.setAnimate(data)
        this.graph.data(data)
        this.setLayout().then(r => console.log(r));
    }

    render(){
        this.graph.render()
    }

    doEnter(e){
        this.graph.setItemState(e.item, 'hover', true);
        if (this.isSelect) {
            return;
        }
        e.item.getEdges().forEach((edge) => this.graph.setItemState(edge, 'running', true));
    }

    initListener(){
        this.graph.on('node:mouseenter', (e) => {
            this.doEnter(e)
        });
        this.graph.on('node:mouseleave', (e) => {
            this.graph.setItemState(e.item, 'hover', false);
            if (this.isSelect){
                return;
            }
            e.item.getEdges().forEach((edge) => this.graph.setItemState(edge, 'running', false));
        });
        this.graph.on('node:click', (e) => {
            this.graph.findAllByState('edge', 'running').forEach((edge) => this.graph.setItemState(edge, 'running', false))
            this.isSelect=false;
            this.doEnter(e)
            this.isSelect = true
            const clickNodes = this.graph.findAllByState('node', 'click');
            clickNodes.forEach((cn) => {
                this.graph.setItemState(cn, 'click', false);
            });
            this.graph.setItemState(e.item, 'hover', false);
            this.graph.setItemState(e.item, 'click', true);
        });
        this.graph.on('dragend', () => {
            this.setLayout().catch((err)=>console.log(err))
        });
        this.graph.on('click', (ev) => {
            if (ev.item === undefined){
                this.isSelect = false;
                this.graph.findAllByState('node', 'click').forEach((cn) => this.graph.setItemState(cn, 'click', false))
                this.graph.findAllByState('node', 'hover').forEach((cn) => this.graph.setItemState(cn, 'hover', false))
                this.graph.findAllByState('edge', 'running').forEach((edge) => this.graph.setItemState(edge, 'running', false))
            }
        })
    }
}
