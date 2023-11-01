const { Events, AuditLogEvent } = require('discord.js');
const dbConnection = require('../dbConnection.js');

module.exports = {
    name: Events.GuildAuditLogEntryCreate,
    once: false,
    async execute(entry) {
        if (entry.action === AuditLogEvent.MemberKick) {
            const { target, reason, executor } = entry;

            const userName = target.username;
            const userId = target.id;
            const executorName = executor.username;
            const executorId = executor.id;

            const sql = 'INSERT INTO kicks (userName, userId, reason, executorName, executorId) VALUES (?, ?, ?, ?, ?)';
            const values = [userName, userId, reason, executorName, executorId];

            dbConnection.query(sql, values, (err) => {
                if (err) {
                    console.error('Error:', err);
                }
                else {
                    console.log('User kicked and data inserted into the database.');
                }
            });
        }
    },
};
