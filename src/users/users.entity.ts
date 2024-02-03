import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
} from 'typeorm';
import { Role } from '../enums/role';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text' })
    username: string;

    @Column({ type: 'text' })
    firstName: string;

    @Column({ type: 'text' })
    lastName: string;

    @Column({ type: 'text' })
    email: string;

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.guest,
    })
    role: Role;

    public generateUsername(
        firstName: string,
        lastName: string,
    ): string {
        // Convert the first name to lowercase
        const firstThreeLetters = firstName
            .toLowerCase()
            .slice(0, 3);
        // Convert the last name to lowercase and filter out vowels
        const consonants = lastName
            .toLowerCase()
            .replace(/[aeiou]/gi, '')
            .slice(0, 3);
        // Fill up remaining consonants with "x"
        const remainingConsonants = 3 - consonants.length;
        const filledConsonants =
            consonants + 'x'.repeat(remainingConsonants);

        // Format the occurrences number as a 3-digit string
        const first6letters = 'abcdef';
        let count = 0;
        let word = filledConsonants + firstThreeLetters;

        for (const letter of first6letters) {
            // Create a regular expression to match the letter in the word
            const regex = new RegExp(letter, 'gi');

            // Use the match() method to find all occurrences of the letter in the word
            const matches = word.match(regex);

            // Increase the count by the number of matches found
            if (matches) {
                count += matches.length;
            }
        }
        const occurrencesString = String(count).padStart(
            3,
            '0',
        );
        // Concatenate the username parts
        const username =
            firstThreeLetters +
            filledConsonants +
            occurrencesString;
        return username;
    }
}
