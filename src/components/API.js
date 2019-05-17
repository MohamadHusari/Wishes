let events = [{
    category: "Birthday",
    eventTitle: "Today is My Birthday",
    when: "14:30",
    where: "Nazareth"
}, {
    category: "Graduating",
    eventTitle: "Today is My Graduating",
    when: "19:30",
    where: "Haifa"
}, {
    category: "New Car",
    eventTitle: "Buying New Car",
    when: "10:00",
    where: "Tel-Aviv"
}, {
    category: "New Home",
    eventTitle: "Buying New Home",
    when: "22:15",
    where: "Nazareth-illit"
}]

export const getEvents = () => {
return (events);
}

export const addEvent = (event) => {
events.push(event)
}



// export const getUsers = () => {
//     return axios.get('https://jsonplaceholder.typicode.com/users');
// }