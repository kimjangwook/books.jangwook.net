class NovelCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['title', 'cover', 'desc', 'status', 'tags'];
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    render() {
        const title = this.getAttribute('title') || 'Untitled';
        const cover = this.getAttribute('cover') || '';
        const desc = this.getAttribute('desc') || '';
        const status = this.getAttribute('status') || '';
        const tags = JSON.parse(this.getAttribute('tags') || '[]');

        this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: 'Noto Serif JP', serif;
          margin-bottom: 2rem;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }

        :host(.visible) {
          opacity: 1;
          transform: translateY(0);
        }

        .card {
          background-color: #fff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(43, 58, 103, 0.15);
        }

        .cover-container {
          position: relative;
          width: 100%;
          padding-top: 60%; /* Aspect ratio */
          overflow: hidden;
          background-color: #f0f0f0;
        }

        .cover-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .card:hover .cover-image {
          transform: scale(1.05);
        }

        .status-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          background-color: rgba(43, 58, 103, 0.9);
          color: #F9F4EF;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.75rem;
          letter-spacing: 0.05em;
          backdrop-filter: blur(4px);
        }

        .content {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 12px;
        }

        .tag {
          font-size: 0.7rem;
          color: #D4944C;
          border: 1px solid #D4944C;
          padding: 2px 8px;
          border-radius: 4px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .title {
          font-size: 1.25rem;
          color: #2B3A67;
          margin: 0 0 10px 0;
          line-height: 1.4;
          font-weight: 700;
        }

        .desc {
          font-size: 0.9rem;
          color: #555;
          line-height: 1.8;
          margin-bottom: 1rem;
          flex-grow: 1;
        }

        .read-more {
          align-self: flex-start;
          color: #2B3A67;
          text-decoration: none;
          font-size: 0.85rem;
          font-weight: 600;
          border-bottom: 1px solid transparent;
          transition: border-color 0.3s ease;
          margin-top: auto;
          display: inline-flex;
          align-items: center;
        }

        .read-more::after {
          content: '→';
          margin-left: 6px;
          transition: transform 0.3s ease;
        }

        .read-more:hover {
          border-bottom-color: #2B3A67;
        }

        .read-more:hover::after {
          transform: translateX(4px);
        }

        @media (max-width: 768px) {
          .cover-container {
            padding-top: 70%;
          }
        }
      </style>

      <div class="card">
        <div class="cover-container">
          <img src="${cover}" alt="${title}" class="cover-image" loading="lazy">
          <span class="status-badge">${status}</span>
        </div>
        <div class="content">
          <div class="tags">
            ${tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
          </div>
          <h3 class="title">${title}</h3>
          <p class="desc">${desc}</p>
          <a href="#" class="read-more">Read details</a>
        </div>
      </div>
    `;
    }
}

customElements.define('novel-card', NovelCard);
