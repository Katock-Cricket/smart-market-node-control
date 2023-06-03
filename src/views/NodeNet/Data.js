export default {
    data: {
        nodes: [
            {
                id: '0',
                label: '云端',
                name: "云0",
                size: 40,
                type: 'major',
                style: {
                  fill: '#363636',
                },
                status: 'running',
                address: '北京',
                lineData: {
                    expectedData: [100, 120, 161, 134, 105, 160, 165],
                    actualData: [120, 82, 91, 154, 162, 140, 145]
                },
            },
            {
                id: '1',
                label: '边缘',
                name: "边1",
                size: 40,
                style: {
                    fill: '#4F4F4F',
                },
                status: 'running',
                address: '北京',
                lineData: {
                    expectedData: [20, 0, 10, 34, 15, 16, 65],
                    actualData: [20, 2, 21, 54, 12, 14, 45]
                },
            },
            {
                id: '2',
                label: '边缘',
                name: "边2",
                size: 35,
                style: {
                    fill: '#363636',
                },
                status: 'running',
                address: '北京',
                lineData: {
                    expectedData: [10, 20, 11, 34, 15, 10, 165],
                    actualData: [12, 8, 9, 54, 12, 40, 145]
                },
            },
            {
                id: '3',
                label: '边缘',
                name: "边3",
                size: 25,
                style: {
                    fill: '#1C1C1C',
                },
                status: 'running',
                address: '天津',
                lineData: {
                    expectedData: [100, 120, 161, 134, 105, 160, 165],
                    actualData: [120, 82, 91, 154, 162, 140, 145]
                },
            },
            {
                id: '4',
                label: '边缘',
                name: "边4",
                size: 28,
                style: {
                    fill: '#363636',
                },
                status: 'running',
                address: '石家庄',
                lineData: {
                    expectedData: [100, 120, 161, 134, 105, 160, 165],
                    actualData: [120, 82, 91, 154, 162, 140, 145]
                },
            },
            {
                id: '5',
                label: '边缘',
                name: "边5",
                size: 20,
                style: {
                    fill: '#1C1C1C',
                },
                status: 'running',
                address: '衡水',
                lineData: {
                    expectedData: [100, 120, 161, 134, 105, 160, 165],
                    actualData: [120, 82, 91, 154, 162, 140, 145]
                },
            },
            {
                id: '6',
                label: '边缘',
                name: "边6",
                size: 24,
                style: {
                    fill: '#1C1C1C',
                },
                status: 'running',
                address: '上海',
                lineData: {
                    expectedData: [100, 120, 161, 134, 105, 160, 165],
                    actualData: [120, 82, 91, 154, 162, 140, 145]
                },
            },
            {
                id: '7',
                label: '边缘',
                name: "边7",
                size: 31,
                style: {
                    fill: '#1C1C1C',
                },
                status: 'running',
                address: '深圳',
                lineData: {
                    expectedData: [100, 120, 161, 134, 105, 160, 165],
                    actualData: [120, 82, 91, 154, 162, 140, 145]
                },
            },
            {
                id: '8',
                label: '边缘',
                name: "边8",
                size: 23,
                style: {
                    fill: '#828282',
                },
                status: 'closed',
                address: '太原',
                lineData: {
                    expectedData: [100, 120, 161, 134, 105, 160, 165],
                    actualData: [120, 82, 91, 154, 162, 140, 145]
                },
            },
            {
                id: '9',
                label: '边缘',
                name: "边9",
                size: 20,
                style: {
                    fill: '#4F4F4F',
                },
                status: 'running',
                address: '秦皇岛',
                lineData: {
                    expectedData: [100, 120, 161, 134, 105, 160, 165],
                    actualData: [120, 82, 91, 154, 162, 140, 145]
                },
            },
        ],
        edges: [
            {
                source: '0',
                target: '1',
            },
            {
                source: '0',
                target: '2',
            },
            {
                source: '0',
                target: '3',
            },
            {
                source: '0',
                target: '4',
            },
            {
                source: '0',
                target: '5',
            },
            {
                source: '0',
                target: '6',
            },
            {
                source: '0',
                target: '7',
            },
            {
                source: '0',
                target: '8',
            },
            {
                source: '0',
                target: '9',
            },
        ]
    }
}
