import React,{ useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import Backdrop from '../../components/Backdrop'
import BackdropLoading from '../../components/BackdropLoading'
import Loading from '../../components/Loading'
import '../../CSS/ScraperView.css'
import CardContainer from '../../components/CardContainer'
import AddScraperModal from '../../components/AddScraperModal'
import { Table, Td, Th } from '../../components/Table'
import { render } from '@testing-library/react';

const ScraperView = () => {
  const[loadingState, setLoadingState] = useState(false)
  const[addScraper,setAddScraper] = useState(false)
  const [scrapers, setScrapers] = React.useState([])
  React.useEffect(() => {
    async function fetchData() {
      const response = await axios('http://localhost:5000/api/scrapers/')
      console.log(response.data)
      setScrapers(response.data.Scrapers)
    }
    fetchData()
  }, [])

  function newScraper(){
    setLoadingState(true)
    console.log(document.getElementById('currency'))
    var str = document.getElementById("frequency").value
    if ( /^[1-9]\d*$/.test(str) === false ){
      alert("Valor de frecuencia erroneo, debe ser mayor o igual a 1")
      document.getElementById("frequency").value = 50
      setLoadingState(false)
    }
    else{
      axios({
        method:'POST',
        url: 'http://localhost:5000/api/scrapers/',
        data: {
          currency: document.getElementById('currency').value,
          frequency: document.getElementById('frequency').value
        }
      }).then(() =>{
        setAddScraper(false)
        refreshScrapers()
      }).catch(function(error) {
        alert(error.response.data['error'])
        setLoadingState(false)
      })
    }
  }

  function refreshScrapers(){
    axios.get('http://localhost:5000/api/scrapers/')
      .then(response=>{
        setScrapers(response.data.Scrapers)
        setLoadingState(false)
      })
  }

  function refreshScrapersBtn(){
    setLoadingState(true)
    refreshScrapers()
  }

  function filterScrapers(){
    setLoadingState(true)
    var scrapersAux = {Scrapers:[]}
    var i = 0
    for (i = 0; i < scrapers.length; i++) {
      if(scrapers[i]['currency'] === document.getElementById('filter_text').value || scrapers[i]['id'] === parseInt(document.getElementById('filter_text').value) ){
        scrapersAux['Scrapers'].push(scrapers[i])
        console.log(scrapersAux)
        console.log(scrapers[i]['currency'])
      }
    }
    setScrapers(scrapersAux['Scrapers'])
    setLoadingState(false)
  }

  return (
    <div className="container_div">
      {loadingState && <Loading/>}
      {loadingState && <BackdropLoading/>}
      {(addScraper || loadingState) && <Backdrop/>}
      {addScraper &&<AddScraperModal confirm={() =>newScraper()} cancel={() => setAddScraper(false)}></AddScraperModal>}
      
      <h1 className="main_title">Scrapers creados</h1>
      <div id="top_buttons">
        <button id="btn_refresh" className="btn custom-btn" onClick={()=> refreshScrapersBtn()}>⟳</button>
        <button id="btn_filter" className="btn custom-btn" onClick={()=> filterScrapers()}>Filtrar</button>
        <input id="filter_text" className="form-control filter" placeholder="Ingresar criptomoneda"></input>
      </div>
      
      <CardContainer height='50vh' width='80%' padding='2rem' justifyContent='center' alignItems='center'>
        <Table>
          <thead>
            <Th>ID</Th>
            <Th>Moneda</Th>
            <Th>Último valor leído</Th>
            <Th>Fecha última actualización</Th>
            <Th>Frecuencia</Th>
            <Th>Fecha de creación</Th>
          </thead>
          {scrapers.map(scraper => (
            <tr>
              <Td>{scraper.id}</Td>
              <Td>{scraper.currency}</Td>
              <Td>$ {scraper.value}</Td>
              <Td>{moment(scraper.value_updated_at).format("HH:mm:ss DD/MM/YY")}</Td>
              <Td>{scraper.frequency}</Td>
              <Td>{moment(scraper.created_at).format("HH:mm:ss DD/MM/YY")}</Td>
            </tr>
          ))}
        </Table>
      </CardContainer>
      <div className="div_addScraperBtn">
          <button className="btn custom-btn" onClick={() => setAddScraper(true)}>Crear scraper</button>
      </div>
    </div>
  )
}

export default ScraperView