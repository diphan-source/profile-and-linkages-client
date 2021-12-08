import React,{useState, useEffect} from 'react'
import { Grid} from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core";
import { Link, useNavigate  } from 'react-router-dom'
import OppCard from '../../components/JobOpportunities/Card'
import styles from '../../styles/Opportunity.module.css'
import db from '../../firebase/firebase'
import  { collection, getDocs,getFirestore } from 'firebase/firestore'


function Test({data}) {
  const db = getFirestore();
  const theme = createTheme({
    typography: {
      fontFamily: "Montserrat, sans-serif",
      fontWeightRegular: 500,
      body2: {
        fontWeight: 600,
        fontSize: "0.9rem",
        "@media (max-width:600px)": {
          fontSize: "2.1rem",
        },
      },
      h5: {
        fontWeight: 620,
        fontSize: 19,
        color: "#41ad48",
        "@media (max-width:600px)": {
          fontSize: "2.2rem",
        },
      },
      h6: {
        fontWeight: 620,
        fontSize: 17,
        "@media (max-width:600px)": {
          fontSize: "2.2rem",
        },
      },
    },
  });


  const [todos,setTodos] = useState([])
const [search, setSearch] = useState("");


  const fetchdata = async(e)=>{
      e.preventDefault()
    const querySnapshot = await getDocs(collection(db, "jobs"));
    querySnapshot.forEach((doc) => {
        setTodos((prev)=>{
                return[...prev,doc.data()]
        })
    });
  }



    return (
        <ThemeProvider theme={theme}>
             <div>
        <title>
          <title>EDU LINKAGES</title>
          <meta name="description" content="Become a software developer" />
        </title>
      <div>
        <button onClick={fetchdata}>View Jobs</button>
      </div>
    
      <Grid container spacing={0} style={{ display: "flex", flexDirection: "column" }}>
          <div container spacing={1} className={styles.search}>
            <div item xs={6} md={4}>
              <input
                className={styles.search1}
                placeholder="Company name"
                type="text"
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
            </div>

          </div>
          <Grid container spacing={3} alignItems="stretch" justifyContent="space-between">
            {todos
            .filter((info) => {
                if (search === "") {
                  return info;
                } else if (
                  info.coName.toLowerCase().includes(search.toString().toLocaleLowerCase())
                ) {
                  return info;
                }
              })
            .map((info) => (
            
                  <Grid item xs={12} sm={6} md={4} key={info.id}>
                   <OppCard
                  job= {info.jobTitle}
                  company={info.coName}
                      location={info.location}
                      deadline={info.deadline}
                      paragraph={info.jobDescription}
                   />


                  </Grid>
            
              ))}
                
             
          </Grid>
        </Grid>
      </div>
        </ThemeProvider>
    )

}

export default Test
