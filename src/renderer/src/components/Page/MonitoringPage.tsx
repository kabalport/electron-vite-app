import { useState, useEffect, useRef } from 'react';
import { Button, TextField, Box, Typography, Paper } from '@mui/material';
import * as d3 from 'd3';

// eslint-disable-next-line react/prop-types
const BarChart = ({ data }) => {
  const ref = useRef();

  useEffect(() => {
    // 기존의 SVG 내용을 지웁니다.
    d3.select(ref.current).selectAll("*").remove();

    // 차트의 크기 및 마진 설정
    const margin = { top: 30, right: 0, bottom: 10, left: 30 };
    const width = 640 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    // x와 y 축을 위한 스케일 설정
    const xScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.seconds)])
      .range([0, width]);

    const yScale = d3.scaleBand()
      // eslint-disable-next-line react/prop-types
      .domain(data.map(d => d.name))
      .range([0, height])
      .padding(0.1);

    // SVG 요소 선택
    const svg = d3.select(ref.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // 막대 그리기
    svg.selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .attr("x", 0)
      .attr("y", d => yScale(d.name))
      .attr("width", d => xScale(d.seconds))
      .attr("height", yScale.bandwidth());

    // x 축 추가
    svg.append("g")
      .call(d3.axisTop(xScale).ticks(5))
      .attr("transform", `translate(0,0)`);

    // y 축 추가
    svg.append("g")
      .call(d3.axisLeft(yScale));
  }, [data]);

  return <svg ref={ref}></svg>;
};

const MonitoringPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [chartData, setChartData] = useState([]);





  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddData = () => {
    // 사용자 입력값을 파싱하여 chartData에 추가합니다.
    // 입력값 형식은 "이름,초"로 가정합니다 (예: "항목1,30").
    const parts = inputValue.split(',');
    if (parts.length === 2) {
      const newData = { name: parts[0].trim(), seconds: Number(parts[1].trim()) };
      setChartData([...chartData, newData]);
      setInputValue(''); // 입력 필드 초기화
    } else {
      alert('Invalid input format. Please use "name,seconds".');
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>Monitoring Dashboard</Typography>
      <Paper sx={{ padding: 2, marginBottom: 2 }}>
        <TextField
          label="Add Data (name,seconds)"
          value={inputValue}
          onChange={handleInputChange}
          sx={{ marginRight: 1 }}
        />
        <Button variant="contained" onClick={handleAddData}>
          Add
        </Button>
      </Paper>
      <BarChart data={chartData} />
    </Box>
  );
};

export default MonitoringPage;
