import {  useNavigate } from "react-router-dom";

import { HeroCard } from "../"
;
import { useForm } from "../../hooks/useForm" 
import { useSearch } from "../hooks/useSearch";

export const SearchPage = () => {

  const navigate = useNavigate();
 
  const {heroes, q, showError, showSearch} = useSearch();
                                                                               
  const { searchText, onInputChange } = useForm({
    searchText: q 
  });

  const onSearchSubmit = ( e ) => {
    e.preventDefault();

    // if( searchText.trim().length <= 1 ) return;
  
    navigate(`?q=${ searchText }`);
  }

  return (
    <>
      <h1>Search</h1>
      <hr />
      <div className="row">
        <div className="col-5">
          <h4>Searching</h4>
          <hr />
          <form onSubmit={ onSearchSubmit } aria-label="form">
            <input 
            type="text" 
            placeholder="Search a hero"
            className="form-control"
            name="searchText"
            autoComplete="off"
            value={ searchText }
            onChange={onInputChange}
            />
            <button className="btn btn-outline-primary mt-2">
              Search
            </button>
          </form>
        </div>
        <div className="col-7">
          <h4>Results</h4>
          <hr />

          <div className="alert alert-primary animate__animated animate__fadeIn" style={{display: showSearch ? '' : 'none' }} aria-label="alertSearchHero" >
            Search a hero
          </div>

          <div className="alert alert-danger animate__animated animate__fadeIn" style={{display: showError ? '' : 'none'}}  aria-label="alertNoFoundHero" >
            No hero with <b>{ q }</b>
          </div>

          
            { 
              heroes.map( hero => <HeroCard key={ hero.id } {...hero }/>)
            }
          
        </div>
      </div>
    </>
  )
}
