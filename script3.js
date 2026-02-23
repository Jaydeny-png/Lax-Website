// stats-specific functionality

function renderStats(data) {
    const statsContainer = document.getElementById('stats-container');
    if (!statsContainer) return;

    // remove any existing content
    statsContainer.innerHTML = '';

    // team summary list
    const ul = document.createElement('ul');
    ul.style.listStyle = 'none';
    ul.style.padding = '0';

    const addItem = (label, value) => {
        if (value === undefined || value === null || value === '') return;
        const li = document.createElement('li');
        li.innerHTML = `<strong>${label}:</strong> ${value}`;
        ul.appendChild(li);
    };

    addItem('Current Record', data.record);
    addItem('Team Goals', data.teamGoals);
    addItem('Team Assists', data.teamAssists);
    addItem('Team Points', data.teamPoints);
    addItem('Team Ground Balls', data.teamGB);
    addItem('Team FOS Win %', data.teamFOSWinPercent);

    // leading scorer(s) can be a string or array
    if (data.leadingScorers) {
        if (Array.isArray(data.leadingScorers)) {
            data.leadingScorers.forEach(s => {
                let text = s.name;
                if (s.goals !== undefined) text += ` (${s.goals} goals)`;
                addItem('Leading Scorer', text);
            });
        } else {
            let text = data.leadingScorers;
            if (data.leadingScorerGoals) text += ` (${data.leadingScorerGoals} goals)`;
            addItem('Leading Scorer', text);
        }
    }

    if (data.nextGame) addItem('Next Game', data.nextGame);
    if (data.lastUpdated) addItem('Last Updated', data.lastUpdated);

    statsContainer.appendChild(ul);

    // individual player stats table
    if (data.players && Array.isArray(data.players) && data.players.length) {
        const table = document.createElement('table');
        table.style.width = '100%';
        table.style.borderCollapse = 'collapse';
        table.classList.add('stats-table');

        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        // include position and class columns if available
        ['Pos','Class','Name','G','A','P','GB','FOS-Taken','FOS-Won','FOS-Win%'].forEach(text => {
            const th = document.createElement('th');
            th.textContent = text;
            th.style.borderBottom = '1px solid #ccc';
            th.style.padding = '4px';
            th.style.textAlign = 'center';
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        data.players.forEach(player => {
            const tr = document.createElement('tr');
            ['position','class','name','G','A','P','GB','FOS-Taken','FOS-Won','FOS-Win%'].forEach(key => {
                const td = document.createElement('td');
                td.style.padding = '4px';
                td.style.textAlign = 'center';
                td.textContent = player[key] !== undefined ? player[key] : '';
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });
        table.appendChild(tbody);
        statsContainer.appendChild(table);
    }

    // optionally render goalie stats
    if (data.goalies && Array.isArray(data.goalies) && data.goalies.length) {
        const gtable = document.createElement('table');
        gtable.style.width = '100%';
        gtable.style.borderCollapse = 'collapse';
        gtable.classList.add('stats-table');

        const gthead = document.createElement('thead');
        const gheaderRow = document.createElement('tr');
        ['Name','Saves','GA','GP'].forEach(text => {
            const th = document.createElement('th');
            th.textContent = text;
            th.style.borderBottom = '1px solid #ccc';
            th.style.padding = '4px';
            th.style.textAlign = 'center';
            gheaderRow.appendChild(th);
        });
        gthead.appendChild(gheaderRow);
        gtable.appendChild(gthead);

        const gtbody = document.createElement('tbody');
        data.goalies.forEach(player => {
            const tr = document.createElement('tr');
            ['name','Saves','GA','GP'].forEach(key => {
                const td = document.createElement('td');
                td.style.padding = '4px';
                td.style.textAlign = 'center';
                td.textContent = player[key] !== undefined ? player[key] : '';
                tr.appendChild(td);
            });
            gtbody.appendChild(tr);
        });
        gtable.appendChild(gtbody);
        statsContainer.appendChild(gtable);
    }
}

function fetchStats() {
    const statsContainer = document.getElementById('stats-container');
    if (!statsContainer) return;

    fetch('stats.json')
        .then(res => {
            if (!res.ok) throw new Error('Network response was not ok');
            return res.json();
        })
        .then(data => {
            renderStats(data);
        })
        .catch(err => {
            console.warn('Stats fetch failed, falling back to inline', err);
            const inline = document.getElementById('stats-data');
            if (inline) {
                try {
                    const data = JSON.parse(inline.textContent);
                    renderStats(data);
                } catch (pe) {
                    statsContainer.textContent = 'Failed to parse stats.';
                    console.error('Inline stats parse error:', pe);
                }
            } else {
                statsContainer.textContent = 'Failed to load stats.';
            }
        });
}

// initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('stats-container')) {
        fetchStats();
        setInterval(fetchStats, 60000);
    }
});