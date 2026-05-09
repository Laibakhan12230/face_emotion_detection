import {
    PieChart,
    Pie,
    Tooltip,
    Cell
} from 'recharts'

const COLORS = [
    '#3b82f6',
    '#8b5cf6',
    '#10b981',
    '#f59e0b',
    '#ef4444',
    '#14b8a6',
    '#6366f1'
]

export default function EmotionChart({data}){

    return(

        <PieChart width={350} height={300}>

            <Pie
                data={data}
                dataKey="value"
                outerRadius={100}
            >

                {
                    data.map((entry,index)=>(

                        <Cell
                            key={index}
                            fill={COLORS[index % COLORS.length]}
                        />

                    ))
                }

            </Pie>

            <Tooltip />

        </PieChart>

    )
}