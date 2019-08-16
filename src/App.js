import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      repoName: '',
      containerBadgeLink: '',
      usfmErrorBadgeLink: '',
      viewTip: false,
    };

    this.generateMarkdown = this.generateMarkdown.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
    this.updateRepoName = this.updateRepoName.bind(this);
    this.copyUsfmBadgeLink = this.copyUsfmBadgeLink.bind(this);
    this.copyContainerBadgeLink = this.copyContainerBadgeLink.bind(this);
    this.showTooltip = this.showTooltip.bind(this);
  }

  generateMarkdown() {
    var newLink = `![Build Badge](https://img.shields.io/endpoint?url=https://test-repo-badges-bucket.s3.us-east-2.amazonaws.com/${this.state.username}/${this.state.repoName}.json&style=for-the-badge)`
    var usfmErrors = `![USFM Badge](https://img.shields.io/endpoint?url=https://test-repo-badges-bucket.s3.us-east-2.amazonaws.com/${this.state.username}/${this.state.repoName}_errors.json&style=for-the-badge)`
    this.setState({containerBadgeLink: newLink})
    this.setState({usfmErrorBadgeLink: usfmErrors})
  }

  updateRepoName(event) {
    this.setState({repoName: event.target.value})
    this.setState({containerBadgeLink: ''})
    this.setState({usfmErrorBadgeLink: ''})
  }

  updateUsername(event) {
    this.setState({username: event.target.value})
    this.setState({containerBadgeLink: ''})
    this.setState({usfmErrorBadgeLink: ''})
  }

  copyUsfmBadgeLink() {
    this.showTooltip()
    var copyText = document.getElementById("usfm-badge-link")
    copyText.select();
    document.execCommand("copy");
    document.getSelection.removeAllRanges()
    window.getSelection().removeAllRanges()
  }

  copyContainerBadgeLink() {
    this.showTooltip()
    var copyText = document.getElementById("container-badge-link")
    copyText.select();
    document.execCommand("copy");
    document.getSelection.removeAllRanges()
    window.getSelection().removeAllRanges()
  }

  showTooltip() {
    this.setState({viewTip: true})
    setTimeout(() => {
      this.setState({viewTip: false})
    }, 1000);

  }

  render() {
    return (
      <div className="App">
        <header><label> Markdown Badge Generator</label></header>
        <div className="user-input">
          <div>
            <input id="username" className="input" 
            placeholder="Enter Username" value={this.state.username}
            onChange={this.updateUsername}/>
            <input id="repo-name" className="input" 
            placeholder="Enter Repo Name" value={this.state.repoName} 
            onChange={this.updateRepoName}/>
          </div>

          <button onClick={this.generateMarkdown}> Generate Markdown</button>
        </div>


        <div className="markdown-link" rows="2">
          <h2>Is Valid Container Badge</h2>
          <textarea type="text-area" className="generated-markdown" 
          id="container-badge-link"
          value={this.state.containerBadgeLink} readOnly
          onClick={this.copyContainerBadgeLink}
          />

          <h2> USFM Error Badge</h2>
          <textarea type="text-area" className="generated-markdown" 
          id="usfm-badge-link"
          value={this.state.usfmErrorBadgeLink} readOnly
          onClick={this.copyUsfmBadgeLink}
          />
          <label className={this.state.viewTip? 'view': 'none'}>Link copied to clipboard!</label>
        </div>
      </div>
    );
  }
}

export default App;
