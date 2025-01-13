import prisma from "~/lib/prisma";

/**
 * Checks if a given table exists in the Prisma client instance.
 *
 * @param {string} table - The name of the table to check for existence.
 * @returns {Promise<boolean>} - A promise that resolves to a boolean indicating whether the table exists.
 */

const checkTable = async (table: string): Promise<boolean> => {
  let tableExists = true;
  if (!prisma[table]) {
    tableExists = false;
  }
  return tableExists;
};
export default checkTable;
