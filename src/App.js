import React, {useCallback, useRef, useState} from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import Form from "react-bootstrap/Form";
import moment from '../node_modules/moment/moment';
import "moment/locale/ko";

function createBulkTodos() {
    const array = [];
    for (let i = 1; i <= 3; i++) {
      array.push({
        id: i,
        text: `할 일 ${i}`,
        checked: false,
      });
    }
    return array;
  }

const App = () => {
  const [todos, setTodos] = useState(createBulkTodos);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  // 고윳값으로 사용될 id
  // ref를 사용하여 변수 담기
  const nextId = useRef(4);
 
  const onInsert = useCallback(
    text => {
      const todo = {
        id: nextId.current,
        text: (text +" "+moment(startDate).format('YYYY.MM.DD (ddd)')+" ~ "+moment(endDate).format('YYYY.MM.DD (ddd)')).split("\n"),
        checked: false,
      };
      setTodos(todos => todos.concat(todo));
      nextId.current += 1; // nextId 1씩 더하기
      setStartDate(new Date());
      setEndDate(new Date());
    },
    [startDate, endDate],
  );

  const onRemove = useCallback(
    id => {
      setTodos(todos => todos.filter(todo => todo.id !== id));
    },
    [],
  );

  const onToggle = useCallback(
    id => {
      setTodos(todos => 
        todos.map(todo =>
          todo.id === id ? { ...todo, checked: !todo.checked } : todo
        ),
      )      
    },
    [],
  );

  
  return (
    <TodoTemplate>
      <div style={{color: "#dee2e6",background:"#495057", paddingLeft: "0.5rem",fontFamily: "system-ui"}}>시작</div>
      <DatePicker
        selected={startDate} 
        onChange={(date) => setStartDate(date)}
        locale={ko}                   // 한글로 변경
        dateFormat="yyyy.MM.dd (eee)" // 시간 포맷 변경
        showPopperArrow={false}       // 화살표 변경
        minDate={new Date()}          // 오늘 날짜 전은 선택 못하게
        customInput={		      // 날짜 뜨는 인풋 커스텀
        <Form.Control as="textarea" rows={1} readOnly style={{width:"99%", resize: "none", border: "none"}}/>
        }
      />
      <div style={{color: "#dee2e6",background:"#495057", paddingLeft: "0.5rem",fontFamily: "system-ui"}}>종료</div>
      <DatePicker
        selected={endDate} 
        onChange={(date) => setEndDate(date)}
        locale={ko}                   // 한글로 변경
        dateFormat="yyyy.MM.dd (eee)" // 시간 포맷 변경
        showPopperArrow={false}       // 화살표 변경
        minDate={new Date()}          // 오늘 날짜 전은 선택 못하게
        customInput={		      // 날짜 뜨는 인풋 커스텀
        <Form.Control as="textarea" rows={1} readOnly style={{width:"99%", resize: "none", border: "none"}}/>
        }
      />
      <TodoInsert onInsert={ onInsert } />      
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle}/>
    </TodoTemplate>
  );
};
 
export default App;