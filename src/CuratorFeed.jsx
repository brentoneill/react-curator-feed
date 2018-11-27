import React, { Component, Fragment } from "react";
import axios from "axios";
import { format } from "date-fns";

const apiUrl = "https://api.curator.io/v1";

class App extends Component {
  feedId: null;
  posts: null;

  constructor(props) {
    super(props);

    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    const { config } = this.props;

    config.apiUrl = apiUrl ? apiUrl : config.apiUrl;

    axios
      .get(`${config.apiUrl}/feeds?api_key=${config.apiKey}`)
      .then(res => {
        if (res && res.status === 200) {
          this.feedId = res.data[0].id;
          axios
            .get(
              `${config.apiUrl}/feeds/${this.feedId}/posts?api_key=${
                config.apiKey
              }`
            )
            .then(res => {
              if (res && res.status === 200) {
                const { posts } = res.data;
                this.setState({ posts: posts.splice(0, config.postsToShow) });
              }
            })
            .catch(err => {
              console.error(err);
            });
        } else {
          console.log("there was an error getting feed");
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  parsePostContent(content) {
    function parseString(c, idx) {
      if (c.includes("http")) {
        // Handle links
        return (
          <span
            style={{ wordBreak: "initial", display: "block", margin: "10px 0" }}
            key={idx}
            className="CuratorFeed--post-link"
          >
            <a href={c} target="_blank" rel="noopener noreferrer">
              {c}
            </a>
            &nbsp;
          </span>
        );
      } else if (c.startsWith("@")) {
        // Handle users
        return (
          <span
            style={{ wordBreak: "initial" }}
            key={idx}
            className="CuratorFeed--user-link"
          >
            <a
              href={`https://twitter.com/${c
                .substring(1, c.length)
                .toLowerCase()}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {c}
            </a>
            &nbsp;
          </span>
        );
      } else if (c.startsWith("#")) {
        // Handle hashtags
        return (
          <span
            style={{ wordBreak: "initial" }}
            key={idx}
            className="CuratorFeed--hashtag-link"
          >
            <a
              href={`https://twitter.com/search?q=%23${c
                .substring(1, c.length)
                .toLowerCase()}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {c}
            </a>
            &nbsp;
          </span>
        );
      } else {
        // Handle plain text
        return <Fragment key={idx}>{c} </Fragment>;
      }
    }

    return (
      content &&
      content.length &&
      content.split(" ").map((c, idx) => {
        if (/\r|\n/.exec(c)) {
          return null;
        } else {
          return parseString(c, idx);
        }
      })
    );
  }

  render() {
    const { posts } = this.state;

    return (
      <ul className="CuratorFeed">
        {!posts.length && <p>Loading...</p>}
        {posts &&
          posts.map(p => {
            return (
              <li key={p.id} style={{ listStyleType: "none" }}>
                <div>
                  <div
                    className="CuratorFeed__meta"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <img
                      alt={p.user_full_name}
                      src={p.user_image}
                      style={{ marginRight: 10 }}
                    />
                    <div
                      className="CuratorFeed__meta-user"
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      <span className="CuratorFeed__post-date">
                        {format(new Date(p.source_created_at), "MMM D")}
                      </span>
                      <a
                        rel="noopener noreferrer"
                        style={{ textDecoration: "none" }}
                        href={p.user_url}
                        target="_blank"
                      >
                        @{p.user_full_name}
                      </a>
                    </div>
                  </div>
                  <div className="CuratorFeed__post">
                    <p>{this.parsePostContent(p.text)}</p>
                  </div>
                </div>
              </li>
            );
          })}
      </ul>
    );
  }
}

export default App;
