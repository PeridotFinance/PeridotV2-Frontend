# Next.js DeFi Platform

## Database Setup and Configuration

This project uses PostgreSQL as its database, configured for secure local development. Below are the detailed setup instructions and configuration details.

### Prerequisites

- PostgreSQL 16.x
- Node.js
- npm
- A Unix-like operating system (Linux/macOS)

### Database Configuration

The database is configured with the following security measures:
- Listens only on localhost (127.0.0.1)
- Uses secure password authentication (scram-sha-256)
- No public access allowed
- Connection only through local Unix socket or localhost TCP/IP

### Database Structure

The database schema includes two main tables:

#### UserEmail Table
```sql
- id: Integer (Primary Key, Auto-increment)
- email: String (Unique)
- createdAt: DateTime (Default: now())
```

#### Event Table
```sql
- id: Integer (Primary Key, Auto-increment)
- eventType: String
- data: JSON
- timestamp: DateTime (Default: now())
```

### Setup Instructions

1. **Install PostgreSQL:**
   ```bash
   sudo apt-get update
   sudo apt-get install -y postgresql postgresql-contrib
   ```

2. **Create Database and User:**
   ```bash
   # Log into PostgreSQL as postgres user
   sudo -u postgres psql

   # Create database and user (run these commands in psql)
   CREATE DATABASE nextjs_app;
   CREATE USER nextjs_user WITH ENCRYPTED PASSWORD 'your_secure_password';
   ALTER USER nextjs_user WITH CREATEDB;
   GRANT ALL PRIVILEGES ON DATABASE nextjs_app TO nextjs_user;
   \c nextjs_app
   GRANT ALL ON SCHEMA public TO nextjs_user;
   ```

3. **Environment Configuration:**
   Create a `.env` file in the project root with:
   ```
   DATABASE_URL=postgresql://nextjs_user:<your_password>@localhost:5432/nextjs_app?schema=public
   ```
   Note: Replace `<your_password>` with your actual database password.

4. **Install Dependencies:**
   ```bash
   npm install prisma --save-dev
   npm install @prisma/client
   ```

5. **Initialize Prisma:**
   ```bash
   npx prisma init
   ```

6. **Apply Database Migrations:**
   ```bash
   npx prisma migrate dev --name init
   ```

### Development

To start development:

1. Ensure PostgreSQL is running:
   ```bash
   sudo systemctl status postgresql
   ```

2. Update dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

### Database Management

- To view the database schema:
  ```bash
  npx prisma studio
  ```

- To reset the database:
  ```bash
  npx prisma migrate reset
  ```

- To create a new migration after schema changes:
  ```bash
  npx prisma migrate dev --name <migration_name>
  ```

### Security Notes

- The database is configured to only accept local connections
- All passwords should be stored securely in environment variables
- The `.env` file is excluded from version control
- Regular database backups are recommended
- Maintain proper access control for production environments

### Deployment Considerations

When deploying to production:

1. Use different database credentials for production
2. Ensure all sensitive data is properly encrypted
3. Configure proper firewall rules
4. Use SSL/TLS for database connections
5. Regularly update and patch all dependencies

### Troubleshooting

Common issues and solutions:

1. **Cannot connect to database:**
   - Verify PostgreSQL is running: `sudo systemctl status postgresql`
   - Check credentials in .env file
   - Ensure database port (5432) is not blocked

2. **Prisma migration issues:**
   - Run `npx prisma generate` to update client
   - Check migration history: `npx prisma migrate status`
   - Reset database if needed: `npx prisma migrate reset`

## Contributing

Please read CONTRIBUTING.md for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details
