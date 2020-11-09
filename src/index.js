import React, { useState, Suspense } from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider, useQuery } from "react-apollo-hooks";
import gql from "graphql-tag";
import "./style.css";

const client = new ApolloClient({
  uri: "https://countries.trevorblades.com",
});

const CountryQuery = gql`
  query Country($skipNative: Boolean!) {
    country(code: "IN") {
      code
      name
      native @skip(if: $skipNative)
      phone
      capital
      currency
      languages {
        code
        name
        native @skip(if: $skipNative)
      }
    }
  }
`;

function App() {
  const [skipNative, setSkipNative] = useState(false);
  const { data } = useQuery(CountryQuery, {
    variables: { skipNative },
  });

  console.log(data);
  return (
    <div>
      <h2>We are reading about {data?.country?.name}</h2>
      <div>Name in native : {data?.country?.native}</div>
      <div>Country Code : {data?.country?.code}</div>
      <div>Capital : {data?.country?.capital}</div>
      <div>Language : {data?.country?.languages[0]?.name}</div>
      <div>Language Native : {data?.country?.languages[0]?.native}</div>
      <div></div>
      <button onClick={() => setSkipNative(!skipNative)}>toggle skip</button>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Suspense fallback={null}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Suspense>,
  rootElement
);
