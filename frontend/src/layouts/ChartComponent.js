import React, { useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";


import css from "@styles/chart.module";


export default function ChartComponent() {
    const chartRef = useRef()
    const [ticker, setTicker] = useState("SBER")

    const getDate = (str) => {
        return Date.parse(str) / 1000
    }

    const chartOptions = {
        autoSize: true,
        layout: {
            background: { color: "rgba(0, 0, 0, 0)" }
        }
    }

    function transformData(data) {
        return data.map(item => {
            return {
                time: getDate(item.begin),
                open: item.open,
                close: item.close,
                low: item.low,
                high: item.high
            }
        })
    }

    async function plotData(ticker) {
        // fetch data from api endpoint
        const resp = await fetch(`/api/candles?ticker=${ticker}`)
        let data = await resp.json()
        data = transformData(data)
        // create chart and plot retrieved data
        const chart = createChart(chartRef.current, chartOptions)
        const series = chart.addCandlestickSeries()

        series.applyOptions({
            wickUpColor: 'rgb(54, 116, 217)',
            upColor: 'rgb(54, 116, 217)',
            wickDownColor: 'rgb(225, 50, 85)',
            downColor: 'rgb(225, 50, 85)',
            borderVisible: false,
        })

        series.setData(data)
    }

    function handleSelect(event) {
        setTicker(event.target.value)
    }

    useEffect(() => {
        plotData(ticker)
        return () => {
            // on each ticker update clean up previous chart before creating next one 
            // so that they do not stack up on top of each other
            chartRef.current.querySelector(".tv-lightweight-charts").remove()
        }
    }, [ticker])


    return (
        <div ref={chartRef} className={css.chart_container}>
            <div className={css.ticker_info_container}>
                <select className={css.select_ticker} onChange={handleSelect}>
                    <option value="SBER">SBER</option>
                    <option value="GAZP">GAZP</option>
                </select>
            </div>
        </div>
    )
}