import React from 'react'
import moment from "moment";

// Примерное решение - расписание в виде списка
// более сложный вариант - расписание, которое группирует shows по датам
// и выводит каждую группу отдельно, с указанием только времени для отдельных сеансов
// ещё более сложный - таблица, которая группирует показы по залам и датам.

// форматирование дат и времени для вывода на странице
const formatDate = (dateString) => {
    return moment(dateString).format('YYYY-MM-DD HH:mm')
};

const ShowSchedule = props => {
    return <div className="mt-4">
        <h2>Расписание показов</h2>
        {props.shows.map(show => {
            return <p className='border border-dark'
                      key={show.id}>{formatDate(show.starts_at)}, {props.itemType !== 'hall' ? "Hall: " + show.hall_name : show.movie_name}</p>
        })}
    </div>
};


export default ShowSchedule