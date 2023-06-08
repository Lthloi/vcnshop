import React, { useMemo, useState } from "react"
import { styled } from "@mui/material"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js"
import { Bar as BarChartJs2 } from "react-chartjs-2"
import Select from '@mui/material/Select'
import moment from "moment"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top"
        },
        title: {
            display: true,
            text: "Verified Users And Paid Orders Via Months"
        }
    }
}

const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const set_data = (orders_dataset, users_dataset) => ({
    labels: labels,
    datasets: [
        {
            label: "Number Of Verified Users",
            data: labels.map((label, index) => users_dataset[index]),
            backgroundColor: "rgba(53, 162, 235, 0.5)"
        }, {
            label: "Number Of Paid Orders",
            data: labels.map((label, index) => orders_dataset[index]),
            backgroundColor: "rgba(255, 99, 132, 0.5)"
        }
    ]
})

const check_year = (time_string, year_to_change) => {
    return year_to_change === moment(time_string).get('year')
}

const BarChart = ({ users, orders }) => {
    const [year, setYear] = useState(moment().get('year'))

    const counted_users = useMemo(() => {
        let months = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

        let createdAt, user
        for (let i = 0; i < months.length; i++) {
            user = users[i]
            if (user) {
                createdAt = user.createdAt
                if (createdAt && check_year(createdAt, year) && user.active)
                    months[moment(createdAt).get('month')]++
            }
        }

        return months
    }, [users, year])

    const counted_orders = useMemo(() => {
        let months = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

        let createdAt, order
        for (let i = 0; i < months.length; i++) {
            order = orders[i]
            if (order) {
                createdAt = order.createdAt
                if (createdAt && check_year(createdAt, year) && order.payment_status === 'succeeded')
                    months[moment(createdAt).get('month')]++
            }
        }

        return months
    }, [orders, year])

    const switchYear = (e) => {
        setYear(e.target.value * 1)
    }

    return (
        <div style={{ width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0' }}>
                <span></span>
                <PickYearContainer>
                    <span>Display The Results In</span>
                    <Select
                        native
                        onChange={switchYear}
                        value={year}
                    >
                        <option value={`${year - 2}`}>{year - 2}</option>
                        <option value={`${year - 1}`}>{year - 1}</option>
                        <option value={`${year}`}>{year}</option>
                        <option value={`${year + 1}`}>{year + 1}</option>
                        <option value={`${year + 2}`}>{year + 2}</option>
                    </Select>
                </PickYearContainer>
            </div>
            <BarChartJs2
                data={set_data(counted_orders, counted_users)}
                options={options}
                updateMode="active"
            />
        </div>
    )
}

export default BarChart

const PickYearContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    columnGap: '10px',
    fontFamily: theme.font_family.nunito,
    fontWeight: 'bold',
    color: 'gray',
}))