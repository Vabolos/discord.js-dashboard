const { Events, AuditLogEvent } = require('discord.js');
const dbConnection = require('../dbConnection.js');

module.exports = {
    name: Events.GuildAuditLogEntryCreate,
    once: false,
        async execute(entry) {
            if (entry.action === AuditLogEvent.MemberUpdate && entry.changes[0].key === 'communication_disabled_until') {
            {
                const userId = entry.target.id;
                const userName = entry.target.username;
                const executor = entry.executor.username;
                const executorId = entry.executor.id;
                const timeOut = entry;
                const reason = timeOut.reason ?? 'No reason provided';

                const insertQuery = 'INSERT INTO timeouts (userName, userId, reason, executorName, executorId) VALUES (?, ?, ?, ?, ?)';

                dbConnection.query(insertQuery, [userName, userId, reason, executor, executorId], (error) => {
                    if (error) {
                        console.error('Error executing insert query:', error);
                        return;
                    }
                });
            }
        }
    },
};
