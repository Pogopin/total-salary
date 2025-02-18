<script setup lang="ts">
import { ref, reactive, onBeforeMount, onMounted, computed, watch } from 'vue'
const month_names: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const curr_month = ref('')
const curr_year = ref()
const inMounthDays = ref()

const currentData = ref<Date | undefined | any>()

const first_day = ref<Date | undefined | any>()


const isLeapYear = (year: number) => {
    return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 ===0)
}
const getFebDays = (year: number) => {
    return isLeapYear(year) ? 29 : 28
}
const getToday = (i: number, year: number, month: number, first_day: any) => {
    return i - first_day.value.getDay() + 1 === currentData.value.getDate() && year === currentData.value.getFullYear() && month === currentData.value.getMonth()
}

const getPreYear = () => {
    --curr_year.value
    const d = month_names.indexOf(`${curr_month.value}`)   
    generateCalendar(d, curr_year.value)   
}

const getNextYear = () => {    
    ++curr_year.value
    console.log('month', inMounthDays.value)   

    const d = month_names.indexOf(`${curr_month.value}`)
    generateCalendar(d, curr_year.value)

}

const emptyCells = computed(() => {
    if (!first_day.value) return 0;
    console.log('em', first_day.value)
    console.log('em', first_day.value.getDay())
    if(first_day.value.getDay() === 1) return 7

    if(first_day.value.getDay() == 0) return 6
    return first_day.value.getDay() - 1; // Количество пустых ячеек перед первым днем

})




const generateCalendar = (month: number, year: number) => {
    let days = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    
    if (!month) curr_month.value = currentData.value.getMonth()
    if (!year) curr_year.value = currentData.value.getFullYear()
    
    
    curr_month.value = `${month_names[month]}`
    curr_year.value = year
    inMounthDays.value = days[month]   

    first_day.value = new Date(year, month, 1)     
    
    
}

onBeforeMount(()=> {    

    const currDate = new Date()
    currentData.value = currDate
    generateCalendar(currDate.getMonth(), currDate.getFullYear())
    
})


</script>

<template>
    <div class="wrapper">
        <div class="calendar">
            <div class="calendar__header">
                <div class="month-picker">{{curr_month}}</div>
                <div class="year-picker">
                    <div class="year-change">
                        <pre
                            @click="getPreYear"
                        >&lt</pre>
                    </div>
                    <div class="year">{{curr_year}}</div>
                    <div class="year-change">
                        <pre
                            @click="getNextYear"
                        >&gt</pre>
                    </div>
                </div>
            </div>
            <div class="calendar__body">                
                <table style="border-spacing: 2px; border-collapse: separate;" class="calendar__week-days" role="grid">
                    <thead>
                        <tr role="row">
                            <th>Пн</th>
                            <th>Вт</th>
                            <th>Ср</th>
                            <th>Чт</th>
                            <th>Пт</th>
                            <th>Сб</th>
                            <th>Вс</th>
                        </tr>
                    </thead>
                </table>
                
                <div class="calendar__days">
                    <!-- Пустые ячейки перед первым днем месяца -->
                    <div 
                        v-for="i in emptyCells" 
                        :key="'empty-' + i"
                        class="cell"
                    ></div>

                    <!-- Дни месяца -->
                    <div 
                        v-for="day in inMounthDays" 
                        :key="day"
                        class="cell"
                    >
                        <span>{{ day }}</span>                                          
                    </div>
                </div>
            </div>
        </div>
   </div>
    
   
</template>
<style scoped>
.calendar__week-days thead > tr > th {
    width: 145px;
    color: #53555a;
}
.wrapper {
    height: 100vh;
    display: grid;
    place-items: center;
}
.calendar {
    width: max-content;
    height: max-content;
    padding: 20px;
    overflow: hidden;
    position: relative;
    background-color: #fffffe;
    border-top: 4px solid #fac863;
}
.calendar__header {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    align-items: center;
    font-size: 25px;
    font-weight: 600;
    margin-bottom: 30px;
}
.month-picker {
    padding: 5px 10px;
    border-radius: 10px;
    cursor: pointer;
}
.year-picker {
    display: flex;
    gap: 20px;
    align-items: center;
}
.year-change {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    /* margin: 0 10px; */
    cursor: pointer;
}
.calendar__body {
    padding: 10px;
}
.calendar__week-days div {
    width: 50px;
    display: grid;
    place-items: center;
}
.calendar__days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-gap: 2px;
}
.cell {
    width: 145px;
    height: 119px;
	border: 1px solid #ddd;
	background-color: #fffffe;
    position: relative;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>