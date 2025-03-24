-- DropForeignKey
ALTER TABLE "bans" DROP CONSTRAINT "bans_server_id_fkey";

-- DropForeignKey
ALTER TABLE "bans" DROP CONSTRAINT "bans_sufferer_id_fkey";

-- DropForeignKey
ALTER TABLE "chat_groups" DROP CONSTRAINT "chat_groups_server_id_fkey";

-- DropForeignKey
ALTER TABLE "chat_rooms" DROP CONSTRAINT "chat_rooms_chat_group_id_fkey";

-- DropForeignKey
ALTER TABLE "friends_connect" DROP CONSTRAINT "friends_connect_user1_id_fkey";

-- DropForeignKey
ALTER TABLE "friends_connect" DROP CONSTRAINT "friends_connect_user2_id_fkey";

-- DropForeignKey
ALTER TABLE "invites" DROP CONSTRAINT "invites_server_id_fkey";

-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_chat_room_id_fkey";

-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_reply_to_id_fkey";

-- DropForeignKey
ALTER TABLE "roles" DROP CONSTRAINT "roles_server_id_fkey";

-- DropForeignKey
ALTER TABLE "server_user_connect" DROP CONSTRAINT "server_user_connect_server_id_fkey";

-- DropForeignKey
ALTER TABLE "server_user_connect" DROP CONSTRAINT "server_user_connect_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user_role_connect" DROP CONSTRAINT "user_role_connect_role_id_fkey";

-- DropForeignKey
ALTER TABLE "user_role_connect" DROP CONSTRAINT "user_role_connect_user_id_fkey";

-- AddForeignKey
ALTER TABLE "friends_connect" ADD CONSTRAINT "friends_connect_user1_id_fkey" FOREIGN KEY ("user1_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friends_connect" ADD CONSTRAINT "friends_connect_user2_id_fkey" FOREIGN KEY ("user2_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invites" ADD CONSTRAINT "invites_server_id_fkey" FOREIGN KEY ("server_id") REFERENCES "servers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "server_user_connect" ADD CONSTRAINT "server_user_connect_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "server_user_connect" ADD CONSTRAINT "server_user_connect_server_id_fkey" FOREIGN KEY ("server_id") REFERENCES "servers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_groups" ADD CONSTRAINT "chat_groups_server_id_fkey" FOREIGN KEY ("server_id") REFERENCES "servers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_rooms" ADD CONSTRAINT "chat_rooms_chat_group_id_fkey" FOREIGN KEY ("chat_group_id") REFERENCES "chat_groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_reply_to_id_fkey" FOREIGN KEY ("reply_to_id") REFERENCES "messages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_chat_room_id_fkey" FOREIGN KEY ("chat_room_id") REFERENCES "chat_rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bans" ADD CONSTRAINT "bans_server_id_fkey" FOREIGN KEY ("server_id") REFERENCES "servers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bans" ADD CONSTRAINT "bans_sufferer_id_fkey" FOREIGN KEY ("sufferer_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roles" ADD CONSTRAINT "roles_server_id_fkey" FOREIGN KEY ("server_id") REFERENCES "servers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_role_connect" ADD CONSTRAINT "user_role_connect_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_role_connect" ADD CONSTRAINT "user_role_connect_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
